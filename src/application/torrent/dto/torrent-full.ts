import { BagHash, BagId } from "@src/domain/bag/types"

import { TorrentFile } from "./torrent-file"

export class TorrentFull {
    constructor(
        readonly bagId: BagId,
        readonly bagHash: BagHash,
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
}
