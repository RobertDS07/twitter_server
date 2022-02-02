import { check } from 'express-validator'

import { RequestHandler } from 'express'

import BaseClassMiddlewares from '../../_baseClassMiddlewares'

import verifyErrorsExpressValidator from 'middlewares/verifyErrorsExpressValidator'

class AuthenticationMiddlewares extends BaseClassMiddlewares {
    post: RequestHandler[] = [
        check(`email`)
            .trim()
            .exists({ checkFalsy: true })
            .withMessage(`Required Email`)
            .isEmail()
            .withMessage(`Invalid Email`),
        check(`password`)
            .exists({ checkFalsy: true })
            .withMessage(`Required password`),
        verifyErrorsExpressValidator,
    ]
}

export default new AuthenticationMiddlewares()
