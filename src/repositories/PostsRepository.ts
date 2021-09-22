import { ModelCtor } from 'sequelize/types'

import BaseRepository from './_baseClassRepository'

import Posts, { IPost } from 'models/Posts'

class PostsRepository extends BaseRepository<IPost> {
    constructor(model: ModelCtor<IPost>) {
        super(model)
    }
}

export default new PostsRepository(Posts)
