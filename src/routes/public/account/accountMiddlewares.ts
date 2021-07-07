import { NextFunction, Request, RequestHandler, Response } from 'express'

import BaseClassMiddlewares from '../../baseClassMiddlewares'

class AccountMiddlewares extends BaseClassMiddlewares {
    all: RequestHandler[] = [
        (req: Request, res: Response, next: NextFunction): void => {
            req.headers.oi = 'true'
            next()
        },
    ]
}

export default new AccountMiddlewares()