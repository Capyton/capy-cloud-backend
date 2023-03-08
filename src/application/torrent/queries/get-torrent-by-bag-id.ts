import { TorrentFull } from "@src/application/torrent/dto/torrent-full"
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

    async execute(command: GetTorrentByBagId): Promise<TorrentFull> {
        return await this.torrentReader.getTorrentByBagId(command.bagId)
    }
}
