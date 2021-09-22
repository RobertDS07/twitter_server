import request from 'supertest'

import app from '../../../src/app'

import tokenService from '../../../src/services/tokenService'

import createUser from '../../utils/createUser'
import truncateDatabase from '../../utils/truncateDatabase'

describe(`/check route tests`, () => {
    beforeEach(async () => {
        await truncateDatabase()
    })

    it(`Should return a 204 for valid token`, async () => {
        const { user } = await createUser()

        const token = tokenService.createToken(user)

        const res = await request(app)
            .get(`/check`)
            .set({ Authorization: `Bearer ${token}` })

        expect(res.statusCode).toBe(204)
    })

    it(`Should return a error (401) for invalid token`, async () => {
        const token = `Invalid-Token`

        const res = await request(app)
            .get(`/check`)
            .set({ Authorization: `Bearer ${token}` })

        expect(res.statusCode).toBe(401)
    })
})
