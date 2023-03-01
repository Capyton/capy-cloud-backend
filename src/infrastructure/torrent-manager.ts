import { TorrentManager } from "@src/application/torrent/interfaces"
import { Torrent } from "@src/domain/torrent/entities"

export class TorrentManagerImpl implements TorrentManager {
    async addTorrent(bagDescription: string, bagDir: string): Promise<Torrent> {
        // TODO: Implement this method to create torrent using `ton-storage-daemon`.
        console.warn(
            "Method not implemented yet. "
            + "Need to implement this method to create torrent using `ton-storage-daemon`. "
            + "This method return test torrent."
        )

        return Promise.resolve(Torrent.create(
            bagDir, "badHash",
            0, bagDescription,
            0, 0, 0,
            false, false, false,
            0, 0,
            null, [],
        ))
    }

    async deleteTorrentByBagId(bagId: string): Promise<void> {
        // TODO: Implement this method to delete torrent using `ton-storage-daemon`.
        throw new Error(
            "Method not implemented yet. "
            + "Need to implement this method to delete torrent using `ton-storage-daemon"
        )
    }
}
