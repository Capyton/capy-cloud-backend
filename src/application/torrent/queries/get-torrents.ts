import { Torrent } from "@src/application/torrent/dto/torrent"
import { TorrentReader } from "@src/application/torrent/interfaces"

export class GetTorrents { }

export class GetTorrentsHandler {
    constructor(
        readonly torrentReader: TorrentReader,
    ) { }

    execute(_command: GetTorrents): Promise<Torrent[]> {
        return this.torrentReader.getTorrents()
    }
}
