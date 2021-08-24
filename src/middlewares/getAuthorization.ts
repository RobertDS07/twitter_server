/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express'

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

        if (!token) throw new Error()

        const decodedToken = tokenService.decodeToken(token as string)

        setCredentials(req, decodedToken)

        next()
    } catch (e) {
        res.status(401).send(`Invalid Credentials`)
    }
}
