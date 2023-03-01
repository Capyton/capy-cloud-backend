export class TorrentFile {
    constructor(
        readonly name: string,
        readonly size: number,
        readonly priority: number,
        readonly downloadedSize: number,
    ) { }

    static create(
        name: string,
        size: number,
        priority: number,
        downloadedSize: number,
    ): TorrentFile {
        return new TorrentFile(name, size, priority, downloadedSize)
    }
}
