import { TorrentCreateError, TorrentRemoveByBagIdError } from "@src/application/torrent/exceptions"
import { TorrentManager } from "@src/application/torrent/interfaces"
import { BagId } from "@src/domain/bag/types"
import { TorrentFull } from "@src/domain/torrent/entities"
import { TorrentFile } from "@src/domain/torrent_file/entities"
import { hexEncodeFromString } from "@src/utils/hex"
import TonstorageCLI from "tonstorage-cli"

export class TorrentManagerImpl implements TorrentManager {
    constructor(private readonly storageDaemonCLI: TonstorageCLI) { }

    async addTorrent(bagDescription: string | null, bagDir: string): Promise<TorrentFull> {
        const torrent = await this.storageDaemonCLI.create(bagDir, {
            upload: false,
            copy: false,
            description: bagDescription,
        })
        if (!torrent.ok) {
            throw new TorrentCreateError(`Torrent create error: \`${torrent.error}\``)
        }

        const torrentResult = torrent.result["torrent"]
        const bagHash = torrentResult["hash"]
        const bagId = hexEncodeFromString(bagHash)
        const bagSize = torrentResult["total_size"]
        const filesCount = torrentResult["files_count"]
        const includedSize = torrentResult["included_size"]
        const downloadedSize = torrentResult["downloaded_size"]
        const activeDownload = torrentResult["active_download"]
        const activeUpload = torrentResult["active_upload"]
        const completed = torrentResult["completed"]
        const downloadSpeed = torrentResult["download_speed"]
        const uploadSpeed = torrentResult["upload_speed"]
        const fatalError = torrentResult["fatal_error"]

        const bagFiles = torrent.result["files"].map((file: Record<string, any>) => {
            return TorrentFile.create(
                file["name"],
                file["size"],
                file["priority"],
                file["downloaded_size"]
            )
        })

        return TorrentFull.create(
            bagId, bagHash, bagSize, bagDescription,
            filesCount, includedSize, downloadedSize,
            activeDownload, activeUpload, completed,
            downloadSpeed, uploadSpeed, fatalError,
            bagFiles,
        )
    }

    async deleteTorrentByBagId(bagId: BagId): Promise<void> {
        const result = await this.storageDaemonCLI.remove(bagId, { removeFiles: true })
        if (!result.ok) {
            throw new TorrentRemoveByBagIdError(`Torrent remove by bag id error: \`${result.error}\``)
        }
    }
}
