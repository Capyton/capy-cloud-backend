import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common"
import {
    InvalidJwtToken, InvalidNonce, InvalidProofSignature,
    JwtTokenIsExpired, NonceIsExpired, UnknownJwtTokenError, UnknownNonceError
} from "@src/application/auth/exceptions"
import { BagBagIdNotFound, BagIdNotFound } from "@src/application/bag/exceptions"
import { ApplicationException } from "@src/application/common/exceptions"
import { FileIdNotFound } from "@src/application/file/exceptions"
import { ProviderAddressNotFound, ProviderIdNotFound } from "@src/application/provider/exceptions"
import { ProviderBagIdNotFound } from "@src/application/provider_bag/exceptions"
import {
    TorrentBagIdNotFound, TorrentCreateError, TorrentGetByBagIdError,
    TorrentRemoveByBagIdError
} from "@src/application/torrent/exceptions"
import { UserAddressNotFound, UserIdNotFound } from "@src/application/user/exceptions"
import { UserBagIdNotFound } from "@src/application/user_bag/exceptions"
import { Request, Response } from "express"

@Catch(ApplicationException)
export class ApplicationExceptionFilter implements ExceptionFilter {
    catch(exception: ApplicationException, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const response = ctx.getResponse<Response>()
        const request = ctx.getRequest<Request>()

        let status: number
        switch (exception.constructor) {
            case (
                NonceIsExpired || InvalidNonce || JwtTokenIsExpired ||
                InvalidJwtToken || InvalidProofSignature
            ):
                status = 401
                break
            case UnknownNonceError || UnknownJwtTokenError:
                status = 500
                break
            case (
                BagIdNotFound || BagBagIdNotFound || FileIdNotFound ||
                ProviderIdNotFound || ProviderAddressNotFound || ProviderBagIdNotFound ||
                TorrentBagIdNotFound || UserAddressNotFound || UserIdNotFound ||
                UserBagIdNotFound
            ):
                status = 404
                break
            case TorrentCreateError || TorrentGetByBagIdError || TorrentRemoveByBagIdError:
                status = 400
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