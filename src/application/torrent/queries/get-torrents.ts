import { Torrent } from "@src/application/torrent/dto/torrent"
import { TorrentManager } from "@src/application/torrent/interfaces"

export class GetTorrents { }

export class GetTorrentsHandler {
    constructor(
        readonly torrentManager: TorrentManager,
    ) { }

    execute(_command: GetTorrents): Promise<Torrent[]> {
        return this.torrentManager.getTorrents()
    }
}
