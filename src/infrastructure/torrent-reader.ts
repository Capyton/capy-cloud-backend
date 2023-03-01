import { Torrent } from "@src/application/torrent/dto/torrent"
import { TorrentReader } from "@src/application/torrent/interfaces"

export class TorrentReaderImpl implements TorrentReader {
    async getTorrentByBagId(bagId: string): Promise<Torrent> {
        throw new Error(
            "Method not implemented yet. "
            + "Need to implement this method to get torrent by bag id using `ton-storage-daemon"
        )
    }

    async getTorrents(): Promise<Torrent[]> {
        throw new Error(
            "Method not implemented yet. "
            + "Need to implement this method to get torrents using `ton-storage-daemon"
        )
    }

}
