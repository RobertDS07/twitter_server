import { Request } from 'express'

import { IDecodedToken } from 'services/tokenService'

export type TRequest<body = any, query = qs.ParsedQs> = Request<
    Record<string, string>,
    any,
    body,
    query
>

export interface IRequestWithCredentials<body = any, query = qs.ParsedQs>
    extends TRequest<body, query> {
    user: IDecodedToken
}
