import AuthenticationController from './authenticationController'
import AuthenticationMiddlewares from './authenticationMiddlewares'

import BaseClassRoutes from '../../baseClassRoutes'

class AuthenticationRoutes extends BaseClassRoutes {
    constructor() {
        super(
            `/authentication`,
            AuthenticationMiddlewares,
            AuthenticationController,
        )
    }
}

export default new AuthenticationRoutes().createRoutes()
