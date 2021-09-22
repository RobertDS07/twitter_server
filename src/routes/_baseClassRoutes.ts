import { Router } from 'express'

import BaseController from './_baseController'
import BaseClassMiddlewares from './_baseClassMiddlewares'

class BaseClassRoutes {
    routes: Router

    path: string
    controller: BaseController
    middlewares: BaseClassMiddlewares

    constructor(
        path: string,
        middlewares: BaseClassMiddlewares,
        controller: BaseController,
    ) {
        this.routes = Router()

        this.path = path
        this.controller = controller
        this.middlewares = middlewares
    }

    get(): void {
        this.routes.get(
            `${this.path}/:id`,
            ...this.middlewares.all,
            ...this.middlewares.get,
            this.controller.get,
        )
    }

    find(): void {
        this.routes.get(
            `${this.path}`,
            ...this.middlewares.all,
            ...this.middlewares.find,
            this.controller.find,
        )
    }

    post(): void {
        this.routes.post(
            `${this.path}`,
            ...this.middlewares.all,
            ...this.middlewares.post,
            this.controller.post,
        )
    }

    patch(): void {
        this.routes.patch(
            `${this.path}/:id`,
            ...this.middlewares.all,
            ...this.middlewares.patch,
            this.controller.patch,
        )
    }

    delete(): void {
        this.routes.delete(
            `${this.path}/:id`,
            ...this.middlewares.all,
            ...this.middlewares.delete,
            this.controller.delete,
        )
    }

    private initRoutes(): void {
        this.get()
        this.find()
        this.post()
        this.patch()
        this.delete()
    }

    createRoutes(): Router {
        this.initRoutes()

        return this.routes
    }
}

export default BaseClassRoutes
