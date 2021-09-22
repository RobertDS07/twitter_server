import { Request, Response } from 'express'

import { TOrder } from 'repositories/_baseClassRepository'
import { TRequest } from 'src/interfaces/requests'

export interface IFindQuery extends TOrder {
    [key: string]: any
    skip?: number
    limit?: number
}

class BaseController {
    get(req: Request, res: Response): void {
        res.status(405).send(`Method Not Allowed`)
    }
    find(req: TRequest<null, IFindQuery>, res: Response): void {
        res.status(405).send(`Method Not Allowed`)
    }
    post(req: Request, res: Response): void {
        res.status(405).send(`Method Not Allowed`)
    }
    patch(req: Request, res: Response): void {
        res.status(405).send(`Method Not Allowed`)
    }
    delete(req: Request, res: Response): void {
        res.status(405).send(`Method Not Allowed`)
    }
}

export default BaseController
