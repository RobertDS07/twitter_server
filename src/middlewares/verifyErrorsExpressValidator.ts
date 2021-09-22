import { NextFunction, Request, Response } from 'express'

import { validationResult } from 'express-validator'

export default function verifyErrorsExpressValidator(
    req: Request,
    res: Response,
    next: NextFunction,
): void {
    const validation = validationResult(req)

    const errors = validation.array()

    const hasErrors = !!errors.length

    if (hasErrors) {
        res.status(400).send({ errors: errors })
    } else {
        next()
    }
}
