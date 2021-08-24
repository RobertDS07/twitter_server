/* eslint-disable @typescript-eslint/no-unused-vars */
import sequelize from '../../../src/sequelize'

import AuthenticationService from '../../../src/services/authenticationService'

import createUser from '../../utils/createUser'

describe(`authenticationService tests`, () => {
    beforeEach(async () => {
        await sequelize.sync({ force: true })
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

            const user = await AuthenticationService.verifyAndGetUser(
                dataToLogin,
            )

            //Shouldn't pass here

            return false
        } catch (e) {
            const messageQuoteInvalid = e.message
                .toLowerCase()
                .includes(`invalid`)

            expect(messageQuoteInvalid).toBeTruthy()
        }
    })
})
