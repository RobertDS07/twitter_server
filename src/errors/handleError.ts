import { Response } from 'express'

import CustomError, { IErrorBody } from './CustomError'

const createErrorBody = (err: Error): IErrorBody => ({
    errors: [{ msg: err.message ?? `Internal server Error, try again` }],
})

export default function handleError(res: Response, err: CustomError): void {
    const code = err.code ?? 500
    const body = err.body ?? createErrorBody(err)

    res.status(code).send(body)
}
