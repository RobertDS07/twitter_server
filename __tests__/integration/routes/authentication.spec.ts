/* eslint-disable @typescript-eslint/no-unused-vars */
import request from 'supertest'

import app from '../../../src/app'

import sequelize from '../../../src/sequelize'

import createUser from '../../utils/createUser'

describe(`/authentication routes tests`, () => {
    beforeEach(async () => {
        await sequelize.sync({ force: true })
    })

    it(`Should return code 200 and token for correct login`, async () => {
        const { rawData } = await createUser()

        const dataToLogin = {
            email: rawData.email,
            password: rawData.password,
        }

        const res = await request(app).post(`/authentication`).send(dataToLogin)

        expect(res.body).toHaveProperty(`token`)
        expect(res.statusCode).toBe(200)
    })

    it(`Should return code 401 and message for invalid login`, async () => {
        const dataToLogin = {
            email: `asdasdsad@gmail.com`,
            password: `123456789`,
        }

        const res = await request(app).post(`/authentication`).send(dataToLogin)

        expect(res.body).toHaveProperty(
            [`errors`, 0, `msg`],
            `Invalid email or password`,
        )
        expect(res.statusCode).toBe(401)
    })
})
