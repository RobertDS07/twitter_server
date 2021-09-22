import { IPost, TPostAttributes } from 'models/Posts'

import PostsRepository from 'repositories/PostsRepository'

import Users from 'models/Users'

import { IPaginated } from 'src/interfaces/paginated'
import { IPropsFind } from 'repositories/_baseClassRepository'

interface IPropsFindPosts
    extends Partial<Pick<IPropsFind<IPost>, `limit` | `order` | `skip`>> {
    where?: any
}

interface IPostsWithCanChange extends TPostAttributes {
    canChange: boolean
}

class PostsService {
    createPost = PostsRepository.create.bind(PostsRepository)

    async findPosts(
        userId: number,
        props: IPropsFindPosts,
    ): Promise<IPaginated<IPostsWithCanChange>> {
        const { limit, order, skip, where } = props

        const { data: posts, total } = await PostsRepository.find({
            skip,
            where,
            limit,
            order,
            include: {
                model: Users,
                as: `user`,
            },
        })

        const formattedPosts = posts.map(post => ({
            ...post,
            canChange: userId === post.userId,
        }))

        return {
            data: formattedPosts,
            total,
        }
    }
}

export default new PostsService()
