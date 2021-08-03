/* eslint-disable @typescript-eslint/no-unused-vars */
import faker from 'faker'

import sequelize from '../../../src/sequelize'

import PostsRepository from '../../../src/repositories/PostsRepository'

import createUser from '../../utils/createUser'
import createPost from '../../utils/createPost'

describe(`PostsRepository tests`, () => {
    beforeEach(async () => {
        await sequelize.sync({ force: true })
    })

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

    it(`Should update a post and return it`, async () => {
        const { user } = await createUser()

        const post = await createPost(user.id)

        const dataToUpdatePost = {
            userId: user.id,
            content: `updated content`,
        }

        const updatedPost = await PostsRepository.update(
            post.id,
            dataToUpdatePost,
        )

        expect(updatedPost.content).toBe(`updated content`)
    })

    it(`Should return a error to trying change Post that not belongs to userId`, async () => {
        try {
            await createPost()

            const dataToUpdatePost = {
                userId: 100,
                content: faker.lorem.paragraph(),
            }

            await PostsRepository.update(1, dataToUpdatePost)
        } catch (e) {
            const messageQuoteInvalid = e.message
                .toLowerCase()
                .includes(`invalid`)

            expect(messageQuoteInvalid).toBeTruthy()
        }
    })

    it(`Should return paginated list of posts`, async () => {
        await createPost()
        await createPost()

        const { data, total } = await PostsRepository.find()

        const hasData = !!data.length

        expect(hasData).toBeTruthy()
        expect(total).toBe(2)
    })
})
