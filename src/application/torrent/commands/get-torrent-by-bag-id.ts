import { TorrentReader } from "@src/application/torrent/interfaces"
import { TorrentFull } from "@src/domain/torrent/entities"
import { BagId } from "@src/domain/bag/types"

export class GetTorrentByBagId {
    constructor(
        readonly bagId: BagId
    ) { }
}

export class GetTorrentByBagIdHandler {
    constructor(
        readonly torrentReader: TorrentReader,
    ) { }

    async execute(command: GetTorrentByBagId): Promise<TorrentFull> {
        const torrent = await this.torrentReader.getTorrentByBagId(command.bagId)
        return torrent
    }
}
