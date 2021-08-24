import CheckController from './checkController'
import CheckMiddlewares from './checkMiddlewares'

import BaseClassRoutes from '../../baseClassRoutes'

class CheckRoutes extends BaseClassRoutes {
    constructor() {
        super(`/check`, CheckMiddlewares, CheckController)
    }
}

export default new CheckRoutes().createRoutes()
