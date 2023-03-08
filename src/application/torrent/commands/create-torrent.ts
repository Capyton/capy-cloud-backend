import { TorrentManager } from "@src/application/torrent/interfaces"
import { TorrentFull } from "@src/domain/torrent/entities"

export class CreateTorrent {
    constructor(
        readonly bagDescription: string | null,
        readonly bagDir: string,
    ) { }
}

export class CreateTorrentHandler {
    constructor(
        readonly torrentManager: TorrentManager,
    ) { }

    async execute(command: CreateTorrent): Promise<TorrentFull> {
        const torrent = await this.torrentManager.addTorrent(command.bagDescription, command.bagDir)
        return torrent
    }
}
