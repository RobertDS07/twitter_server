import sequelize from '../../../src/sequelize'

import postsService from '../../../src/services/postsService'

import createPost from '../../utils/createPost'
import createUser from '../../utils/createUser'

describe(`postsService tests`, () => {
    beforeEach(async () => {
        await sequelize.sync({ force: true })
    })

    it(`Should return a paginated posts with new property: 'canChange'`, async () => {
        const { user } = await createUser()

        //any post
        await createPost()

        //my post
        await createPost(user.id)

        const dataToFindPosts = {
            skip: 0,
            userId: user.id,
        }

        const { posts } = await postsService.find(dataToFindPosts)

        const hasMyPost = posts.some(post => !!post.canChange)

        expect(hasMyPost).toBeTruthy()
    })
})
