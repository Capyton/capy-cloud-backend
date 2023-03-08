import { Torrent as TorrentDTO } from "@src/application/torrent/dto/torrent"
import { TorrentFull as TorrentFullDTO } from "@src/application/torrent/dto/torrent-full"
import { TorrentGetByBagIdError } from "@src/application/torrent/exceptions"
import { TorrentReader } from "@src/application/torrent/interfaces"
import { BagId } from "@src/domain/bag/types"
import { TorrentFull } from "@src/domain/torrent/entities"
import { TorrentFile } from "@src/domain/torrent_file/entities"
import { hexEncodeFromString } from "@src/utils/hex"
import TonstorageCLI from "tonstorage-cli"

export class TorrentReaderImpl implements TorrentReader {
    constructor(private readonly storageDaemonCLI: TonstorageCLI) { }

    async getTorrentByBagId(bagId: BagId): Promise<TorrentFullDTO> {
        const torrent = await this.storageDaemonCLI.get(bagId)
        if (!torrent.ok) {
            throw new TorrentGetByBagIdError(`Torrent get by bag id error: \`${torrent.error}\``)
        }

        const torrentResult = torrent.result["torrent"]
        const bagHash = torrentResult["hash"]
        const bagSize = torrentResult["total_size"]
        const bagDescription = torrentResult["description"]
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

    async getTorrents(): Promise<TorrentDTO[]> {
        const torrents = await this.storageDaemonCLI.list()
        if (!torrents.ok) {
            throw new TorrentGetByBagIdError(`Torrent get by bag id error: \`${torrents.error}\``)
        }

        const torrentsResult = torrents.result["torrents"]

        return torrentsResult.map((torrentResult: Record<string, any>) => {
            const bagId = hexEncodeFromString(torrentResult["hash"])
            const bagHash = torrentResult["hash"]
            const bagSize = torrentResult["total_size"]
            const bagDescription = torrentResult["description"]
            const filesCount = torrentResult["files_count"]
            const includedSize = torrentResult["included_size"]
            const downloadedSize = torrentResult["downloaded_size"]
            const activeDownload = torrentResult["active_download"]
            const activeUpload = torrentResult["active_upload"]
            const completed = torrentResult["completed"]
            const downloadSpeed = torrentResult["download_speed"]
            const uploadSpeed = torrentResult["upload_speed"]
            const fatalError = torrentResult["fatal_error"]

            return TorrentDTO.create(
                bagId, bagHash, bagSize, bagDescription,
                filesCount, includedSize, downloadedSize,
                activeDownload, activeUpload, completed,
                downloadSpeed, uploadSpeed, fatalError,
            )
        })
    }

}
