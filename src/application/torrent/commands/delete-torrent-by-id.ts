import { TorrentManager } from "@src/application/torrent/interfaces"
import { BagId } from "@src/domain/bag/types"

export class DeleteTorrent {
    constructor(
        readonly bagId: BagId,
    ) { }
}

export class DeleteTorrentHandler {
    constructor(
        readonly torrentManager: TorrentManager,
    ) { }

    async execute(command: DeleteTorrent): Promise<void> {
        this.torrentManager.deleteTorrentByBagId(command.bagId)
    }
}
