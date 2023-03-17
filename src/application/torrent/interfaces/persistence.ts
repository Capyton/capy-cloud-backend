import { BagId } from "@src/domain/bag/types"
import { Torrent as TorrentDTO } from "@src/application/torrent/dto/torrent"
import { TorrentFull } from "@src/domain/torrent/entities"
import { TorrentFull as TorrentFullDTO } from "@src/application/torrent/dto/torrent-full"

export interface TorrentManager {
    addTorrent(bagDescription: string | null, bagDir: string): Promise<TorrentFull>
    addByBagId(bagId: BagId, rootDir: string | null, names: string[]): Promise<TorrentFull>
    deleteTorrentByBagId(bagId: BagId): Promise<void>
    getTorrentByBagId(bagId: BagId): Promise<TorrentFullDTO>
    getTorrents(): Promise<TorrentDTO[]>
}
