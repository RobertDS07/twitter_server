import { check } from 'express-validator'

import { RequestHandler } from 'express'

import BaseClassMiddlewares from '../../_baseClassMiddlewares'

import verifyErrorsExpressValidator from 'middlewares/verifyErrorsExpressValidator'

class AccountsMiddlewares extends BaseClassMiddlewares {
    post: RequestHandler[] = [
        check(`email`)
            .trim()
            .isEmail()
            .withMessage(`Invalid Email`)
            .exists({ checkFalsy: true }),
        check(`password`)
            .exists({ checkFalsy: true })
            .withMessage(`Required password`),
        check(`username`)
            .trim()
            .exists({ checkFalsy: true })
            .withMessage(`Required username`),
        verifyErrorsExpressValidator,
    ]
}

export default new AccountsMiddlewares()
