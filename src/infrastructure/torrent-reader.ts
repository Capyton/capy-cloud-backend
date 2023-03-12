import { BagId } from "@src/domain/bag/types"
import TonstorageCLI from "tonstorage-cli"
import { Torrent as TorrentDTO } from "@src/application/torrent/dto/torrent"
import { TorrentFile } from "@src/domain/torrent_file/entities"
import { TorrentFull } from "@src/domain/torrent/entities"
import { TorrentFull as TorrentFullDTO } from "@src/application/torrent/dto/torrent-full"
import { TorrentGetByBagIdError } from "@src/application/torrent/exceptions"
import { TorrentReader } from "@src/application/torrent/interfaces"
import { hexEncodeFromString } from "@src/utils/hex"

export class TorrentReaderImpl implements TorrentReader {
    constructor(private readonly storageDaemonCLI: TonstorageCLI) { }

    async getTorrentByBagId(bagId: BagId): Promise<TorrentFullDTO> {
        const torrent = await this.storageDaemonCLI.get(bagId)
        if (!torrent.ok) {
            throw new TorrentGetByBagIdError(`Torrent get by bag id error: \`${torrent.error}\``)
        }

        const torrentResult = torrent.result.torrent as Record<string, unknown>
        const bagHash = torrentResult.hash as string
        const bagSize = torrentResult.total_size as number
        const bagDescription = torrentResult.description as string | null
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

    async getTorrents(): Promise<TorrentDTO[]> {
        const torrents = await this.storageDaemonCLI.list()
        if (!torrents.ok) {
            throw new TorrentGetByBagIdError(`Torrent get by bag id error: \`${torrents.error}\``)
        }

        const torrentsResult = torrents.result.torrents as Record<string, unknown>[]

        return torrentsResult.map((torrentResult: Record<string, unknown>) => {
            const bagId = hexEncodeFromString(torrentResult.hash as string)
            const bagHash = torrentResult.hash as string
            const bagSize = torrentResult.total_size as number
            const bagDescription = torrentResult.description as string | null
            const filesCount = torrentResult.files_count as number
            const includedSize = torrentResult.included_size as number
            const downloadedSize = torrentResult.downloaded_size as number
            const activeDownload = torrentResult.active_download as boolean
            const activeUpload = torrentResult.active_upload as boolean
            const completed = torrentResult.completed as boolean
            const downloadSpeed = torrentResult.download_speed as number
            const uploadSpeed = torrentResult.upload_speed as number
            const fatalError = torrentResult.fatal_error as string

            return TorrentDTO.create(
                bagId, bagHash, bagSize, bagDescription,
                filesCount, includedSize, downloadedSize,
                activeDownload, activeUpload, completed,
                downloadSpeed, uploadSpeed, fatalError,
            )
        })
    }

}
