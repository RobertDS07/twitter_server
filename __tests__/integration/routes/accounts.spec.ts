import request from 'supertest'

import faker from 'faker'

import app from '../../../src/app'

import sequelize from '../../../src/sequelize'

import createUser from '../../utils/createUser'

describe(`/accounts routes tests`, () => {
    beforeEach(async () => {
        await sequelize.sync({ force: true })
    })

    it(`Should return a created user and token`, async () => {
        const dataToCreateUser = {
            email: faker.internet.email(),
            username: faker.internet.userName(),
            password: faker.internet.password(),
        }

        const res = await request(app).post(`/accounts`).send(dataToCreateUser)

        expect(res.body).toHaveProperty(`user`)
        expect(res.body).toHaveProperty(`token`)
        expect(res.statusCode).toBe(201)
    })

    it(`Should return code 422 and error for email in use`, async () => {
        const { rawData } = await createUser()

        const res = await request(app).post(`/accounts`).send(rawData)

        const hasError = res.body.errors.length > 0
        const messageQuoteEmail = res.body.errors[0].msg
            .toLowerCase()
            .includes(`email`)

        expect(hasError && messageQuoteEmail).toBeTruthy()
        expect(res.statusCode).toBe(422)
    })
})
