import { Request, Response } from 'express'

import BaseController from '../../_baseController'

import handleError from 'errors/handleError'

import accountsService from 'services/accountsService'
import tokenService from 'services/tokenService'

import { TRequest } from 'src/interfaces/requests'

interface IPostBody {
    email: string
    password: string
    username: string
}

class AccountsController extends BaseController {
    async post(req: TRequest<IPostBody>, res: Response): Promise<void> {
        try {
            const { email, password, username } = req.body

            const user = await accountsService.createAccount({
                email,
                password,
                username,
            })

            const token = tokenService.createToken(user)

            res.status(201).send({ user, token })
        } catch (e: any) {
            handleError(res, e)
        }
    }
}

export default new AccountsController()
