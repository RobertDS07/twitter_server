import AuthenticationService from '../../../src/services/authenticationService'

import createUser from '../../utils/createUser'
import truncateDatabase from '../../utils/truncateDatabase'

describe(`authenticationService tests`, () => {
    beforeEach(async () => {
        await truncateDatabase()
    })

    it(`Should return user for correct login`, async () => {
        const { rawData } = await createUser()

        const dataToLogin = {
            email: rawData.email,
            password: rawData.password,
        }

        const user = await AuthenticationService.verifyAndGetUser(dataToLogin)

        expect(user).toHaveProperty(`id`)
    })

    it(`Should return error for invalid login`, async () => {
        try {
            const dataToLogin = {
                email: `aasds@gmail.com`,
                password: `a`,
            }

            await AuthenticationService.verifyAndGetUser(dataToLogin)

            expect(true).toBeFalsy()
        } catch (e) {
            const messageQuoteInvalid = e.message
                .toLowerCase()
                .includes(`invalid`)

            expect(messageQuoteInvalid).toBeTruthy()
        }
    })
})
