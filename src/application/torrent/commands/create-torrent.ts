import { TorrentFull } from "@src/domain/torrent/entities"
import { TorrentManager } from "@src/application/torrent/interfaces"

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

    execute(command: CreateTorrent): Promise<TorrentFull> {
        return this.torrentManager.addTorrent(command.bagDescription, command.bagDir)
    }
}
