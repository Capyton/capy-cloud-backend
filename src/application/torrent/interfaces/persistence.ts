import { Torrent as TorrentDTO } from "@src/application/torrent/dto/torrent"
import { BagId } from "@src/domain/bag/types"
import { Torrent } from "@src/domain/torrent/entities"

export interface TorrentManager {
    addTorrent(bagDescription: string | null, bagDir: string): Promise<Torrent>
    deleteTorrentByBagId(bagId: BagId): Promise<void>
}

export interface TorrentReader {
    getTorrentByBagId(bagId: BagId): Promise<TorrentDTO>
    getTorrents(): Promise<TorrentDTO[]>
}
