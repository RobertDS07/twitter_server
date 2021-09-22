import { RequestHandler } from 'express'

import { check } from 'express-validator'

import BaseClassMiddlewares from '../../_baseClassMiddlewares'

import getAuthorization from 'middlewares/getAuthorization'
import verifyErrorsExpressValidator from 'middlewares/verifyErrorsExpressValidator'

class PostsMiddlewares extends BaseClassMiddlewares {
    all: RequestHandler[] = [getAuthorization]

    post: RequestHandler[] = [
        check(`content`)
            .exists({ checkFalsy: true })
            .withMessage(`Invalid content`),
        verifyErrorsExpressValidator,
    ]
}

export default new PostsMiddlewares()
