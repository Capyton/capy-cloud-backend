import { BagId } from "@src/domain/bag/types"
import { TorrentManager } from "@src/application/torrent/interfaces"

export class DeleteTorrent {
    constructor(
        readonly bagId: BagId,
    ) { }
}

export class DeleteTorrentHandler {
    constructor(
        readonly torrentManager: TorrentManager,
    ) { }

    execute(command: DeleteTorrent): Promise<void> {
        return this.torrentManager.deleteTorrentByBagId(command.bagId)
    }
}
