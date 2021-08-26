import faker from 'faker'

import { IPost } from '../../src/models/Posts'

import PostsRepository from '../../src/repositories/PostsRepository'

import createUser from './createUser'

export default async function createPost(userId?: number): Promise<IPost> {
    const mockCreatedUser = {
        user: {
            id: userId,
        },
    }

    const { user } = userId ? mockCreatedUser : await createUser()

    const dataToCreatePost = {
        userId: user.id as number,
        content: faker.lorem.paragraph(),
    }

    const post = await PostsRepository.create(dataToCreatePost)

    return post
}
