/* eslint-disable @typescript-eslint/no-unused-vars */
import sequelize from '../../../src/sequelize'

import postsService from '../../../src/services/postsService'

import createPost from '../../utils/createPost'
import createUser from '../../utils/createUser'

describe(`postsService tests`, () => {
    beforeEach(async () => {
        await sequelize.sync({ force: true })
    })

    it(`Should return a paginated list of posts`, async () => {
        const { user } = await createUser()

        //any post
        await createPost()

        //my post
        await createPost(user.id)

        const { posts } = await postsService.find()

        const hasMyPost = posts.some(post => !!post.canChange)

        expect(hasMyPost).toBeTruthy()
    })
})
