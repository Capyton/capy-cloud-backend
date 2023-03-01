import { TorrentManager } from "@src/application/torrent/interfaces"
import { Torrent } from "@src/domain/torrent/entities"

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

    async execute(command: CreateTorrent): Promise<Torrent> {
        const torrent = this.torrentManager.addTorrent(command.bagDescription, command.bagDir)
        return torrent
    }
}
