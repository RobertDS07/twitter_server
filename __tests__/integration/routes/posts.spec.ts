import request from 'supertest'
import faker from 'faker'

import app from '../../../src/app'

import sequelize from '../../../src/sequelize'

import createPost from '../../utils/createPost'
import createUser from '../../utils/createUser'
import createAuthorization from '../../utils/createAuthorization'

describe(`/posts routes tests`, () => {
    beforeEach(async () => {
        sequelize.sync({ force: true })
    })

    describe(`POST`, () => {
        it(`Should return status 201 and the created post`, async () => {
            const { token } = await createUser()

            const dataToPost = {
                content: faker.lorem.paragraph(),
            }

            const header = createAuthorization(token)

            const res = await request(app)
                .post(`/posts`)
                .send(dataToPost)
                .set(header)

            expect(res.statusCode).toBe(201)
            expect(res.body).toHaveProperty(`id`)
        })

        it(`Should return error (401) for invalid token`, async () => {
            const dataToPost = {
                content: faker.lorem.paragraph(),
            }

            const header = createAuthorization(`invalid Token`)

            const res = await request(app)
                .post(`/posts`)
                .send(dataToPost)
                .set(header)

            const messageQuoteInvalid = res.body.errors[0].msg
                .toLowerCase()
                .includes(`invalid`)

            expect(res.statusCode).toBe(401)
            expect(messageQuoteInvalid).toBeTruthy()
        })

        it(`Should return error (422) for no data`, async () => {
            const { token } = await createUser()

            const dataToPost = {
                content: ``,
            }

            const header = createAuthorization(token)

            const res = await request(app)
                .post(`/posts`)
                .send(dataToPost)
                .set(header)

            const messageQuoteInvalid = res.body.errors[0].msg
                .toLowerCase()
                .includes(`invalid`)

            expect(res.statusCode).toBe(422)
            expect(messageQuoteInvalid).toBeTruthy()
        })
    })

    describe(`GET`, () => {
        it(`Should return status 200 and the paginated created posts`, async () => {
            await createPost()
            await createPost()

            const { token } = await createUser()

            const header = createAuthorization(token)

            const res = await request(app)
                .get(`/posts`)
                .query({ skip: 1 })
                .set(header)

            const hasPosts = !!res.body.data.length
            const onePostSkiped = res.body.data.length === 1

            expect(res.statusCode).toBe(200)
            expect(hasPosts && onePostSkiped).toBeTruthy()
        })

        // it(`Should return status 200 and specif created post`, async () => {
        //     return false
        // })

        it(`Should return a error (401) for invalid token`, async () => {
            const header = createAuthorization(`invalid Token`)

            const res = await request(app).get(`/posts`).set(header)

            const messageQuoteInvalid = res.body.message[0].msg
                .toLowerCase()
                .includes(`invalid`)

            expect(res.statusCode).toBe(401)
            expect(messageQuoteInvalid).toBeTruthy()
        })
    })

    describe(`PATCH`, () => {
        it(`Should return status 200 and the updated post`, async () => {
            return false
        })

        it(`Should return a error when trying to modify post that not belongs to user`, async () => {
            return false
        })

        it(`Should return a error for invalid token`, async () => {
            return false
        })
    })

    describe(`DELETE`, () => {
        it(`Should return status 204 and delete the post (delete is on deleted_at)`, async () => {
            return false
        })

        it(`Should return a error when trying to delete post that not belongs to user`, async () => {
            return false
        })

        it(`Should return a error for invalid token`, async () => {
            return false
        })
    })
})
