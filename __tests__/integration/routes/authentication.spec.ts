/* eslint-disable @typescript-eslint/no-unused-vars */
import request from 'supertest'

import app from '../../../src/app'

import createUser from '../../utils/createUser'
import truncateDatabase from '../../utils/truncateDatabase'

describe(`/authentication routes tests`, () => {
    beforeEach(async () => {
        await truncateDatabase()
    })

    it(`Should return code 200 and token for correct login`, async () => {
        const { rawData } = await createUser()

        const dataToLogin = {
            email: rawData.email,
            password: rawData.password,
        }

        const res = await request(app).post(`/authentication`).send(dataToLogin)

        expect(res.statusCode).toBe(200)
        expect(res.body).toHaveProperty(`token`)
    })

    it(`Should return code 401 and message for invalid login`, async () => {
        const dataToLogin = {
            email: `asdasdsad@gmail.com`,
            password: `123456789`,
        }

        const res = await request(app).post(`/authentication`).send(dataToLogin)

        expect(res.statusCode).toBe(401)
        expect(res.body).toHaveProperty(
            [`errors`, 0, `msg`],
            `Invalid email or password`,
        )
    })
})
