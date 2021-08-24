import accountController from './accountsController'
import accountMiddlewares from './accountsMiddlewares'

import BaseClassRoutes from '../../baseClassRoutes'

class AccountsRoutes extends BaseClassRoutes {
    constructor() {
        super(`/accounts`, accountMiddlewares, accountController)
    }
}

export default new AccountsRoutes().createRoutes()
