import sequelize from '../../../src/sequelize'

import TokenService from '../../../src/services/tokenService'

import createUser from '../../utils/createUser'

describe(`tokenService tests`, () => {
    beforeEach(async () => {
        await sequelize.sync({ force: true })
    })

    it(`Should return a token and it must hasn't password of user`, async () => {
        const { user } = await createUser(true)

        const token = TokenService.createToken(user)

        const decodedToken = TokenService.decodeToken(token)

        const tokenIsString = typeof token === `string`
        const tokenHasntPassword = !decodedToken.password

        expect(tokenIsString && tokenHasntPassword).toBeTruthy()
    })
})
