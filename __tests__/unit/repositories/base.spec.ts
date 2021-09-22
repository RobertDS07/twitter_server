import faker from 'faker'

import BaseRepository from '../../../src/repositories/_baseClassRepository'

import Users from '../../../src/models/Users'
import Posts from '../../../src/models/Posts'

import createUser from '../../utils/createUser'
import truncateDatabase from '../../utils/truncateDatabase'
import createPost from '../../utils/createPost'

describe(`Testing base class of repositories`, () => {
    beforeEach(() => truncateDatabase())

    const UsersRepository = new BaseRepository(Users)
    const PostsRepository = new BaseRepository(Posts)

    it(`Should create a user and return it`, async () => {
        const dataToCreateUser = {
            email: faker.internet.email(),
            username: faker.internet.userName(),
            password: faker.internet.password(),
        }

        const createdUser = await UsersRepository.create(dataToCreateUser)

        expect(createdUser).toHaveProperty(`id`)
    })

    it(`Should return a user finding by PK`, async () => {
        const { user } = await createUser()

        const userFindByPk = await UsersRepository.getById(user.id)

        expect(userFindByPk).toHaveProperty(`id`)
    })

    it(`Should return a paginated list of posts`, async () => {
        await createPost()
        await createPost()

        const { data, total } = await PostsRepository.find()

        const hasData = !!data.length

        expect(total).toBe(2)
        expect(hasData).toBeTruthy()
    })

    it(`Should return a paginated list of posts including users`, async () => {
        await createPost()

        const { data: posts } = await PostsRepository.find({
            include: {
                model: Users,
                as: `user`,
            },
        })

        expect(posts[0]).toHaveProperty(`user`)
    })

    it(`Should return a paginated list of posts skiping first`, async () => {
        await createPost()
        await createPost()

        const { data } = await PostsRepository.find({ skip: 1 })

        expect(data).toHaveLength(1)
    })

    it(`Should return a limited paginated list of post with total of 1 post`, async () => {
        await createPost()
        await createPost()

        const { data } = await PostsRepository.find({ limit: 1 })

        expect(data).toHaveLength(1)
    })

    it(`Should return a paginated list of users filtring by username === robert`, async () => {
        const { rawData } = await createUser()

        const { data, total } = await UsersRepository.find({
            where: { email: rawData.email },
        })

        const currentUser = data[0]

        expect(total).toBe(1)
        expect(currentUser).toHaveProperty(`email`, rawData.email)
    })

    it(`Should return a paginated list of post ordered by createdAt asc and desc`, async () => {
        const firstPost = await createPost()
        const secondPost = await createPost()

        const { data: ascendingPosts } = await PostsRepository.find({
            order: {
                createdAt: `asc`,
            },
        })

        const { data: descendingPosts } = await PostsRepository.find({
            order: {
                createdAt: `desc`,
            },
        })

        const firstAscendentPost = ascendingPosts[0]
        const firstDescendingPost = descendingPosts[0]

        expect(firstAscendentPost).toHaveProperty(`id`, firstPost.id)
        expect(firstDescendingPost).toHaveProperty(`id`, secondPost.id)
    })
})
