/* eslint-disable @typescript-eslint/no-unused-vars */
import faker from 'faker'

import bcrypt from 'bcryptjs'

import sequelize from '../../../src/sequelize'

import UsersRepository from '../../../src/repositories/UsersRepository'

import UsersModel, { IUser } from '../../../src/models/Users'

describe(`UsersRepository tests`, () => {
    beforeEach(async () => {
        await sequelize.sync({ force: true })
    })

    it(`Should create a user and doesnt return password`, async () => {
        const dataToCreateUser = {
            email: faker.internet.email(),
            password: faker.internet.password(),
            username: faker.internet.userName(),
        }

        const user = await UsersRepository.create(dataToCreateUser)

        const userHasId = !!user.id

        const userDoesntPassword = !user.password

        expect(userHasId && userDoesntPassword).toBeTruthy()
    })

    it(`Should hash password`, async () => {
        const dataToCreateUser = {
            email: faker.internet.email(),
            password: faker.internet.password(),
            username: faker.internet.userName(),
        }

        const user = await UsersRepository.create(dataToCreateUser)

        const userWithPassword = (await UsersModel.findByPk(user.id)) as IUser

        const passwordIsHashed =
            dataToCreateUser.password !== userWithPassword.password

        const passwordIsValid = bcrypt.compare(
            dataToCreateUser.password,
            userWithPassword.password as string,
        )

        expect(passwordIsHashed && passwordIsValid).toBeTruthy()
    })

    it(`Should return a error for invalid email`, async () => {
        try {
            const dataToCreateUser = {
                email: faker.internet.email(),
                password: faker.internet.password(),
                username: faker.internet.userName(),
            }

            const user = await UsersRepository.create(dataToCreateUser)

            // The function shouldn't arrive here
            return false
        } catch (e) {
            const messageQuoteEmail = e.message.toLowerCase().includes(`email`)

            expect(messageQuoteEmail).toBeTruthy()
        }
    })

    it(`Should return a error for weak password`, async () => {
        try {
            const dataToCreateUser = {
                email: faker.internet.email(),
                password: `123`,
                username: faker.internet.userName(),
            }

            const user = await UsersRepository.create(dataToCreateUser)

            // The function shouldn't arrive here
            return false
        } catch (e) {
            const messageQuoteWeak = e.message.toLowerCase().includes(`weak`)

            expect(messageQuoteWeak).toBeTruthy()
        }
    })
})
