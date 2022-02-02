import { Response } from 'express'

import BaseController from '../../_baseController'

import { IRequestWithCredentials } from 'src/interfaces/requests'

class CheckController extends BaseController {
    async find(req: IRequestWithCredentials, res: Response): Promise<void> {
        const user = req.user

        res.status(200).send({ user })
    }
}

export default new CheckController()
