import { Torrent as TorrentDTO } from "@src/application/torrent/dto/torrent"
import { TorrentFull as TorrentFullDTO } from "@src/application/torrent/dto/torrent-full"
import { BagId } from "@src/domain/bag/types"
import { TorrentFull } from "@src/domain/torrent/entities"

export interface TorrentManager {
    addTorrent(bagDescription: string | null, bagDir: string): Promise<TorrentFull>
    deleteTorrentByBagId(bagId: BagId): Promise<void>
}

export interface TorrentReader {
    getTorrentByBagId(bagId: BagId): Promise<TorrentFullDTO>
    getTorrents(): Promise<TorrentDTO[]>
}
