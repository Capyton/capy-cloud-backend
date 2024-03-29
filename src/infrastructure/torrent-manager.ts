import { Torrent, TorrentFull } from "@src/domain/torrent/entities"
import {
    TorrentAddByBagIdError,
    TorrentCreateError,
    TorrentGetByBagIdError,
    TorrentRemoveByBagIdError,
} from "@src/application/torrent/exceptions"

import { BagId } from "@src/domain/bag/types"
import TonstorageCLI from "tonstorage-cli"
import { Torrent as TorrentDTO } from "@src/application/torrent/dto/torrent"
import { TorrentFile } from "@src/domain/torrent_file/entities"
import { TorrentFull as TorrentFullDTO } from "@src/application/torrent/dto/torrent-full"
import { TorrentManager } from "@src/application/torrent/interfaces"
import { hexEncodeFromString } from "@src/utils/hex"

export class TorrentManagerImpl implements TorrentManager {
    constructor(
        private readonly storageDaemonCLI: TonstorageCLI,
        private readonly rootDir: string | null = null,
    ) { }

    async addTorrent(bagDescription: string | null, bagDir: string): Promise<TorrentFull> {
        const torrent = await this.storageDaemonCLI.create(bagDir, {
            upload: true,
            copy: true,
            description: bagDescription,
        })
        if (!torrent.ok) {
            throw new TorrentCreateError(`Torrent create error: \`${torrent.error}\``)
        }

        const result = torrent.result as Record<string, unknown>

        const torrentResult = result.torrent as Record<string, unknown>
        const bagHash = torrentResult.hash as string
        const bagId = hexEncodeFromString(bagHash)
        const bagSize = torrentResult.total_size as number
        const filesCount = torrentResult.files_count as number
        const includedSize = torrentResult.included_size as number
        const dirName = torrentResult.dir_name as string
        const downloadedSize = torrentResult.downloaded_size as number
        const rootDir = torrentResult.root_dir as string
        const activeDownload = torrentResult.active_download as boolean
        const activeUpload = torrentResult.active_upload as boolean
        const completed = torrentResult.completed as boolean
        const downloadSpeed = torrentResult.download_speed as number
        const uploadSpeed = torrentResult.upload_speed as number
        const fatalError = torrentResult.fatal_error as string

        const torrentFiles = result.files as Record<string, unknown>[]
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
            filesCount, includedSize, dirName, downloadedSize,
            rootDir, activeDownload, activeUpload, completed,
            downloadSpeed, uploadSpeed, fatalError, bagFiles,
        )
    }

    async addByBagId(
        bagId: BagId,
        names: string[],
    ): Promise<TorrentFull> {
        const torrent = await this.storageDaemonCLI.addByHash(bagId, {
            download: true,
            upload: false,
            rootDir: this.rootDir,
            partialFiles: names,
        })
        if (!torrent.ok) {
            throw new TorrentAddByBagIdError(`Torrent add by bag id error: \`${torrent.error}\``)
        }

        const result = torrent.result as Record<string, unknown>

        const torrentResult = result.torrent as Record<string, unknown>
        const bagHash = torrentResult.hash as string
        const bagSize = torrentResult.total_size as number
        const bagDescription = torrentResult.description as string
        const filesCount = torrentResult.files_count as number
        const includedSize = torrentResult.included_size as number
        const dirName = torrentResult.dir_name as string
        const downloadedSize = torrentResult.downloaded_size as number
        const rootDir = torrentResult.root_dir as string
        const activeDownload = torrentResult.active_download as boolean
        const activeUpload = torrentResult.active_upload as boolean
        const completed = torrentResult.completed as boolean
        const downloadSpeed = torrentResult.download_speed as number
        const uploadSpeed = torrentResult.upload_speed as number
        const fatalError = torrentResult.fatal_error as string

        const torrentFiles = result.files as Record<string, unknown>[]
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
            filesCount, includedSize, dirName, downloadedSize,
            rootDir, activeDownload, activeUpload, completed,
            downloadSpeed, uploadSpeed, fatalError, bagFiles,
        )
    }

    async deleteTorrentByBagId(bagId: BagId): Promise<void> {
        const result = await this.storageDaemonCLI.remove(bagId, { removeFiles: true })
        if (!result.ok) {
            throw new TorrentRemoveByBagIdError(`Torrent remove by bag id error: \`${result.error}\``)
        }
    }

    async getTorrentByBagId(bagId: BagId): Promise<TorrentFullDTO> {
        const torrent = await this.storageDaemonCLI.get(bagId)
        if (!torrent.ok) {
            throw new TorrentGetByBagIdError(`Torrent get by bag id error: \`${torrent.error}\``)
        }

        const result = torrent.result as Record<string, unknown>

        const torrentResult = result.torrent as Record<string, unknown>
        const bagHash = torrentResult.hash as string
        const bagSize = torrentResult.total_size as number
        const bagDescription = torrentResult.description as string | null
        const filesCount = torrentResult.files_count as number
        const includedSize = torrentResult.included_size as number
        const dirName = torrentResult.dir_name as string
        const downloadedSize = torrentResult.downloaded_size as number
        const rootDir = torrentResult.root_dir as string
        const activeDownload = torrentResult.active_download as boolean
        const activeUpload = torrentResult.active_upload as boolean
        const completed = torrentResult.completed as boolean
        const downloadSpeed = torrentResult.download_speed as number
        const uploadSpeed = torrentResult.upload_speed as number
        const fatalError = torrentResult.fatal_error as string

        const torrentFiles = result.files as Record<string, unknown>[]
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
            filesCount, includedSize, dirName, downloadedSize,
            rootDir, activeDownload, activeUpload, completed,
            downloadSpeed, uploadSpeed, fatalError, bagFiles,
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
            const dirName = torrentResult.dir_name as string
            const downloadedSize = torrentResult.downloaded_size as number
            const rootDir = torrentResult.root_dir as string
            const activeDownload = torrentResult.active_download as boolean
            const activeUpload = torrentResult.active_upload as boolean
            const completed = torrentResult.completed as boolean
            const downloadSpeed = torrentResult.download_speed as number
            const uploadSpeed = torrentResult.upload_speed as number
            const fatalError = torrentResult.fatal_error as string

            return Torrent.create(
                bagId, bagHash, bagSize, bagDescription,
                filesCount, includedSize, dirName, downloadedSize,
                rootDir, activeDownload, activeUpload, completed,
                downloadSpeed, uploadSpeed, fatalError,
            )
        })
    }
}
