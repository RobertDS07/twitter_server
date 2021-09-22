import PostsController from './postsController'
import PostsMiddlewares from './postsMiddlewares'

import BaseClassRoutes from '../../_baseClassRoutes'

class PostsRoutes extends BaseClassRoutes {
    constructor() {
        super(`/posts`, PostsMiddlewares, PostsController)
    }
}

export default new PostsRoutes().createRoutes()
