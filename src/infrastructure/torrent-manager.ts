import { TorrentCreateError, TorrentRemoveByBagIdError } from "@src/application/torrent/exceptions"

import { BagId } from "@src/domain/bag/types"
import TonstorageCLI from "tonstorage-cli"
import { TorrentFile } from "@src/domain/torrent_file/entities"
import { TorrentFull } from "@src/domain/torrent/entities"
import { TorrentManager } from "@src/application/torrent/interfaces"
import { hexEncodeFromString } from "@src/utils/hex"

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

        const torrentResult = torrent.result.torrent as Record<string, unknown>
        const bagHash = torrentResult.hash as string
        const bagId = hexEncodeFromString(bagHash)
        const bagSize = torrentResult.total_size as number
        const filesCount = torrentResult.files_count as number
        const includedSize = torrentResult.included_size as number
        const downloadedSize = torrentResult.downloaded_size as number
        const activeDownload = torrentResult.active_download as boolean
        const activeUpload = torrentResult.active_upload as boolean
        const completed = torrentResult.completed as boolean
        const downloadSpeed = torrentResult.download_speed as number
        const uploadSpeed = torrentResult.upload_speed as number
        const fatalError = torrentResult.fatal_error as string

        const torrentFiles = torrentResult.files as Record<string, unknown>[]
        const bagFiles = torrentFiles.map((file: Record<string, unknown>) => {
            return TorrentFile.create(
                file.name as string,
                file.size as number,
                file.priority as number,
                file.downloaded_size as number,
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
