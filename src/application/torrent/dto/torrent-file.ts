export class TorrentFile {
    constructor(
        readonly name: string,
        readonly size: number,
        readonly priority: number,
        readonly downloadedSize: number,
    ) { }
}
