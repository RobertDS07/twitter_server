import { ModelCtor } from 'sequelize/types'

import Posts, { IPost } from 'models/Posts'

type TPropsCreatePost = Required<Pick<IPost, `content` | `userId`>>

class PostsRepository {
    model: ModelCtor<IPost>

    constructor(model: ModelCtor<IPost>) {
        this.model = model
    }

    async create(data: TPropsCreatePost): Promise<IPost> {
        const post = await this.model.create(data)

        return post
    }
}

export default new PostsRepository(Posts)
