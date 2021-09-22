import postsService from '../../../src/services/postsService'

import createPost from '../../utils/createPost'
import createUser from '../../utils/createUser'
import truncateDatabase from '../../utils/truncateDatabase'

describe(`postsService tests`, () => {
    beforeEach(() => truncateDatabase())

    it(`Should return a paginated posts with new property: 'canChange'`, async () => {
        const { user } = await createUser()

        //any post
        await createPost()

        //my post
        await createPost(user.id)

        const dataToFindPosts = {
            skip: 0,
        }

        const { data: posts } = await postsService.findPosts(
            user.id,
            dataToFindPosts,
        )

        const hasMyPost = posts.some(post => !!post.canChange)
        const hasUserIncluded = !!posts[0].user.id

        expect(hasMyPost).toBeTruthy()
        expect(hasUserIncluded).toBeTruthy()
    })
})
