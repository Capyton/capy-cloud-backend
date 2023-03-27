import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common"
import { BagBagIdNotFound, BagIdNotFound } from "@src/application/bag/exceptions"
import { FileIdNotFound, FileNameNotFound, FileNotDownloaded } from "@src/application/file/exceptions"
import {
    GetProviderParamsByAddressError,
    NewContractMessageError,
    ProviderAddressNotFound,
    ProviderIdNotFound,
} from "@src/application/provider/exceptions"
import {
    AuthSessionByRefreshTokenNotFound,
    InvalidJwtToken,
    InvalidNonce,
    InvalidProofSignature,
    JwtTokenIsExpired,
    NonceIsExpired,
    ProofIsExpired,
    TonApiError,
    UnknownJwtTokenError,
    UnknownNonceError,
    WalletNotInitialized,
} from "@src/application/auth/exceptions"
import { Request, Response } from "express"
import {
    TorrentAddByBagIdError,
    TorrentBagIdNotFound,
    TorrentCreateError,
    TorrentGetByBagIdError,
    TorrentRemoveByBagIdError,
} from "@src/application/torrent/exceptions"
import { UserAddressNotFound, UserIdNotFound } from "@src/application/user/exceptions"

import { ApplicationException } from "@src/application/common/exceptions"
import { ProviderBagIdNotFound } from "@src/application/provider_bag/exceptions"
import { UserBagIdNotFound } from "@src/application/user_bag/exceptions"

@Catch(ApplicationException)
export class ApplicationExceptionFilter implements ExceptionFilter {
    catch(exception: ApplicationException, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const response = ctx.getResponse<Response>()
        const request = ctx.getRequest<Request>()

        let status: number
        switch (exception.constructor) {
            case AuthSessionByRefreshTokenNotFound:
            case ProofIsExpired:
            case NonceIsExpired:
            case InvalidNonce:
            case JwtTokenIsExpired:
            case InvalidJwtToken:
            case InvalidProofSignature:
            case UnknownNonceError:
            case UnknownJwtTokenError:
            case WalletNotInitialized:
            case TonApiError:
                status = 401
                break
            case BagIdNotFound:
            case BagBagIdNotFound:
            case FileIdNotFound:
            case FileNameNotFound:
            case ProviderIdNotFound:
            case ProviderAddressNotFound:
            case ProviderBagIdNotFound:
            case TorrentBagIdNotFound:
            case UserAddressNotFound:
            case UserIdNotFound:
            case UserBagIdNotFound:
                status = 404
                break
            case FileNotDownloaded:
            case TorrentCreateError:
            case TorrentGetByBagIdError:
            case TorrentRemoveByBagIdError:
            case TorrentAddByBagIdError:
            case NewContractMessageError:
            case GetProviderParamsByAddressError:
                status = 400
                break
            default:
                status = 500
        }

        response.status(status).json({
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url,
            message: exception.message,
        })
    }
}
