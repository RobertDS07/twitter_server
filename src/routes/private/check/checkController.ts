import { Request, Response } from 'express'

import BaseController from '../../_baseController'

class CheckController extends BaseController {
    async find(req: Request, res: Response): Promise<void> {
        res.status(204).send()
    }
}

export default new CheckController()
