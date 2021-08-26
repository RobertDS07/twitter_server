import { Request } from 'express'

import { IDecodedToken } from 'services/tokenService'

export default interface IRequestWithCredentials extends Request {
    user: IDecodedToken
}
