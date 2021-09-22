/* eslint-disable @typescript-eslint/no-unused-vars */
import { RequestHandler } from 'express'

class BaseClassMiddlewares {
    all: RequestHandler[] = []

    get: RequestHandler[] = []

    find: RequestHandler[] = []

    post: RequestHandler[] = []

    patch: RequestHandler[] = []

    delete: RequestHandler[] = []
}

export default BaseClassMiddlewares
