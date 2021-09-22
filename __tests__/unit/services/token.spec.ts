import TokenService from '../../../src/services/tokenService'

import createUser from '../../utils/createUser'
import truncateDatabase from '../../utils/truncateDatabase'

describe(`tokenService tests`, () => {
    beforeEach(async () => {
        await truncateDatabase()
    })

    it(`Should return a token and it must hasn't password of user`, async () => {
        const { user } = await createUser(true)

        const token = TokenService.createToken(user)

        const decodedToken = TokenService.decodeToken(token)

        const tokenIsString = typeof token === `string`
        const tokenHasntPassword = !decodedToken.password

        expect(tokenIsString && tokenHasntPassword).toBeTruthy()
    })

    it(`Should return a error for invalid token`, async () => {
        try {
            TokenService.decodeToken(`Invalid token`)

            // Shouldnt pass here
            expect(true).toBeFalsy()
        } catch (e) {
            const messageQuoteInvalid = e.message
                .toLowerCase()
                .includes(`invalid`)

            expect(messageQuoteInvalid).toBeTruthy()
        }
    })
})
