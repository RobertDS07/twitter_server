/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express'

import handleError from 'errors/handleError'

import tokenService from 'services/tokenService'

const setCredentials = (req: any, credentials: any): void => {
    req.user = credentials
}

export default function getAuthorization(
    req: Request,
    res: Response,
    next: NextFunction,
): void {
    try {
        const authorization = req.headers.authorization

        const token = authorization?.replace(`Bearer `, ``)

        const decodedToken = tokenService.decodeToken(token)

        setCredentials(req, decodedToken)

        next()
    } catch (e: any) {
        handleError(res, e)
    }
}
