import { BagId } from "@src/domain/bag/types"
import { TorrentFull } from "@src/application/torrent/dto/torrent-full"
import { TorrentReader } from "@src/application/torrent/interfaces"

export class GetTorrentByBagId {
    constructor(
        readonly bagId: BagId,
    ) { }
}

export class GetTorrentByBagIdHandler {
    constructor(
        readonly torrentReader: TorrentReader,
    ) { }

    execute(command: GetTorrentByBagId): Promise<TorrentFull> {
        return this.torrentReader.getTorrentByBagId(command.bagId)
    }
}
