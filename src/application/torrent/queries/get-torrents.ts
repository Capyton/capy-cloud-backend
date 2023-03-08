import { TorrentFull } from "@src/application/torrent/dto/torrent-full"
import { TorrentReader } from "@src/application/torrent/interfaces"

export class GetTorrents { }

export class GetTorrentsHandler {
    constructor(
        readonly torrentReader: TorrentReader,
    ) { }

    async execute(command: GetTorrents): Promise<TorrentFull[]> {
        return await this.torrentReader.getTorrents()
    }
}
