import { ApplicationException } from "../common/exceptions"

export class TorrentBagIdNotFound extends ApplicationException { }

export class TorrentCreateError extends ApplicationException { }

export class TorrentRemoveByBagIdError extends ApplicationException { }

export class TorrentGetByBagIdError extends ApplicationException { }
