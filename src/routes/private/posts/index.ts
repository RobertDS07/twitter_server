import PostsController from './postsController'
import PostsMiddlewares from './postsMiddlewares'

import BaseClassRoutes from '../../baseClassRoutes'

class PostsRoutes extends BaseClassRoutes {
    constructor() {
        super(`/posts`, PostsMiddlewares, PostsController)
    }
}

export default new PostsRoutes().createRoutes()
