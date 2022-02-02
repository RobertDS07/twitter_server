import request from 'supertest'

import app from '../../../src/app'

import tokenService from '../../../src/services/tokenService'

import createUser from '../../utils/createUser'
import truncateDatabase from '../../utils/truncateDatabase'

describe(`/check route tests`, () => {
    beforeEach(async () => {
        await truncateDatabase()
    })

    it(`Should return a 200 for valid token and in the body has the data of user that sended req`, async () => {
        const { user } = await createUser()

        const token = tokenService.createToken(user)

        const res = await request(app)
            .get(`/check`)
            .set({ Authorization: `Bearer ${token}` })

        const isSameUser = res.body.user.id === user.id

        expect(isSameUser).toBeTruthy()
        expect(res.statusCode).toBe(200)
    })

    it(`Should return a error (401) for invalid token`, async () => {
        const token = `Invalid-Token`

        const res = await request(app)
            .get(`/check`)
            .set({ Authorization: `Bearer ${token}` })

        expect(res.statusCode).toBe(401)
    })
})
