import { BagId } from "@src/domain/bag/types"
import { TorrentFull } from "@src/application/torrent/dto/torrent-full"
import { TorrentManager } from "@src/application/torrent/interfaces"

export class GetTorrentByBagId {
    constructor(
        readonly bagId: BagId,
    ) { }
}

export class GetTorrentByBagIdHandler {
    constructor(
        readonly torrentManager: TorrentManager,
    ) { }

    execute(command: GetTorrentByBagId): Promise<TorrentFull> {
        return this.torrentManager.getTorrentByBagId(command.bagId)
    }
}
