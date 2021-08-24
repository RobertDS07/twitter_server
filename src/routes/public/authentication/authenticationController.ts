import { Request, Response } from 'express'

import BaseController from '../../baseController'

import tokenService from 'services/tokenService'
import AuthenticationService from 'services/authenticationService'

import handleError from 'errors/handleError'

class AuthenticationController extends BaseController {
    async post(req: Request, res: Response): Promise<void> {
        try {
            const { email, password } = req.body

            const user = await AuthenticationService.verifyAndGetUser({
                email,
                password,
            })

            const token = tokenService.createToken(user)

            res.status(200).send({ user, token })
        } catch (e) {
            handleError(res, e)
        }
    }
}

export default new AuthenticationController()
