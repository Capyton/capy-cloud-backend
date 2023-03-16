import { BagHash, BagId } from "@src/domain/bag/types"

import { TorrentFile } from "@src/domain/torrent_file/entities"

export class TorrentFull {
    constructor(
        readonly bagId: BagId,
        readonly badHash: BagHash,
        readonly totalSize: number,
        readonly description: string | null,
        readonly filesCount: number,
        readonly includedSize: number,
        readonly dirName: string,
        readonly downloadedSize: number,
        readonly rootDir: string,
        readonly activeDownload: boolean,
        readonly activeUpload: boolean,
        readonly completed: boolean,
        readonly downloadSpeed: number,
        readonly uploadSpeed: number,
        readonly fatalError: string | null,
        readonly files: TorrentFile[],
    ) { }

    static create(
        bagId: BagId,
        badHash: BagHash,
        totalSize: number,
        description: string | null,
        filesCount: number,
        includedSize: number,
        dirName: string,
        downloadedSize: number,
        rootDir: string,
        activeDownload: boolean,
        activeUpload: boolean,
        completed: boolean,
        downloadSpeed: number,
        uploadSpeed: number,
        fatalError: string | null,
        files: TorrentFile[],
    ): TorrentFull {
        return new TorrentFull(
            bagId, badHash, totalSize, description, filesCount,
            includedSize, dirName, downloadedSize, rootDir,
            activeDownload, activeUpload, completed, downloadSpeed,
            uploadSpeed, fatalError, files,
        )
    }
}

export class Torrent {
    constructor(
        readonly bagId: BagId,
        readonly badHash: BagHash,
        readonly totalSize: number,
        readonly description: string | null,
        readonly filesCount: number,
        readonly includedSize: number,
        readonly dirName: string,
        readonly downloadedSize: number,
        readonly rootDir: string,
        readonly activeDownload: boolean,
        readonly activeUpload: boolean,
        readonly completed: boolean,
        readonly downloadSpeed: number,
        readonly uploadSpeed: number,
        readonly fatalError: string | null,
    ) { }

    static create(
        bagId: BagId,
        badHash: BagHash,
        totalSize: number,
        description: string | null,
        filesCount: number,
        includedSize: number,
        dirName: string,
        downloadedSize: number,
        rootDir: string,
        activeDownload: boolean,
        activeUpload: boolean,
        completed: boolean,
        downloadSpeed: number,
        uploadSpeed: number,
        fatalError: string | null,
    ): Torrent {
        return new Torrent(
            bagId, badHash, totalSize, description, filesCount,
            includedSize, dirName, downloadedSize, rootDir,
            activeDownload, activeUpload, completed, downloadSpeed,
            uploadSpeed, fatalError,
        )
    }
}
