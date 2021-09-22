import { Response } from 'express'

import BaseController from '../../_baseController'

import tokenService from 'services/tokenService'
import AuthenticationService from 'services/authenticationService'

import handleError from 'errors/handleError'

import { TRequest } from 'src/interfaces/requests'

interface IPostBody {
    email: string
    password: string
}

class AuthenticationController extends BaseController {
    async post(req: TRequest<IPostBody>, res: Response): Promise<void> {
        try {
            const { email, password } = req.body

            const user = await AuthenticationService.verifyAndGetUser({
                email,
                password,
            })

            const token = tokenService.createToken(user)

            res.status(200).send({ user, token })
        } catch (e: any) {
            handleError(res, e)
        }
    }
}

export default new AuthenticationController()
