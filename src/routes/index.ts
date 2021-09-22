import { Router } from 'express'

import accountRoutes from './public/accounts'
import authenticationRoutes from './public/authentication'

import checkRoutes from './private/check'
import postsRoutes from './private/posts'

class Routes {
    private routes: Router

    constructor() {
        this.routes = Router()

        this.init()
    }

    get getRoutes() {
        return this.routes
    }

    private init() {
        this.publicRoutes()
        this.privateRoutes()
        this.notFoundRoute()
    }

    private publicRoutes() {
        this.routes.use(accountRoutes)
        this.routes.use(authenticationRoutes)
    }

    private privateRoutes() {
        this.routes.use(checkRoutes)
        this.routes.use(postsRoutes)
    }

    private notFoundRoute() {
        this.routes.use(`*`, (req, res) => res.status(404).send(`Not Found`))
    }
}

export default new Routes().getRoutes
