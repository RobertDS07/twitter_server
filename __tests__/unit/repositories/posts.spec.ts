/* eslint-disable @typescript-eslint/no-unused-vars */
import faker from 'faker'

import PostsRepository from '../../../src/repositories/PostsRepository'

import createUser from '../../utils/createUser'
import createPost from '../../utils/createPost'
import truncateDatabase from '../../utils/truncateDatabase'

describe(`PostsRepository tests`, () => {
    beforeEach(() => truncateDatabase())

    it(`Should create a Post and return it`, async () => {
        const { user } = await createUser()

        const dataToCreatePost = {
            userId: user.id,
            content: faker.lorem.paragraph(),
        }

        const post = await PostsRepository.create(dataToCreatePost)

        const postHasId = !!post.id

        expect(postHasId).toBeTruthy()
    })

    it(`Should return paginated list of posts`, async () => {
        await createPost()
        await createPost()

        const { data, total } = await PostsRepository.find()

        const hasData = !!data.length

        expect(total).toBe(2)
        expect(hasData).toBeTruthy()
    })
})
