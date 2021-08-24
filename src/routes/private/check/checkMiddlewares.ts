import { RequestHandler } from 'express'

import BaseClassMiddlewares from '../../baseClassMiddlewares'

import getAuthorization from 'middlewares/getAuthorization'

class CheckMiddlewares extends BaseClassMiddlewares {
    all: RequestHandler[] = [getAuthorization]
}

export default new CheckMiddlewares()
