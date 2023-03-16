import { BagId } from "@src/domain/bag/types"
import { TorrentFull } from "@src/domain/torrent/entities"
import { TorrentManager } from "@src/application/torrent/interfaces"

export class AddTorrentByBagId {
    constructor(
        readonly bagId: BagId,
        readonly rootDir: string | null,
        readonly filenames: string[],
    ) { }
}

export class AddTorrentByBagIdHandler {
    constructor(
        readonly torrentManager: TorrentManager,
    ) { }

    execute(command: AddTorrentByBagId): Promise<TorrentFull> {
        return this.torrentManager.addByBagId(command.bagId, command.rootDir, command.filenames)
    }
}
