import { Torrent } from "@src/application/torrent/dto/torrent"
import { TorrentReader } from "@src/application/torrent/interfaces"
import { BagId } from "@src/domain/bag/types"

export class GetTorrentByBagId {
    constructor(
        readonly bagId: BagId,
    ) { }
}

export class GetTorrentByBagIdHandler {
    constructor(
        readonly torrentReader: TorrentReader,
    ) { }

    async execute(command: GetTorrentByBagId): Promise<Torrent> {
        return await this.torrentReader.getTorrentByBagId(command.bagId)
    }
}
