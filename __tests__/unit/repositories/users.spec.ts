/* eslint-disable @typescript-eslint/no-unused-vars */
import faker from 'faker'

import bcrypt from 'bcryptjs'

import UsersRepository from '../../../src/repositories/UsersRepository'

import { IUser } from '../../../src/models/Users'

import createUser from '../../utils/createUser'
import truncateDatabase from '../../utils/truncateDatabase'

describe(`UsersRepository tests`, () => {
    beforeEach(async () => {
        await truncateDatabase()
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
        const { rawData } = await createUser()

        const userWithPassword = (await UsersRepository.getByEmail(
            rawData.email,
            true,
        )) as IUser

        const passwordIsHashed = rawData.password !== userWithPassword.password

        const passwordIsValid = await bcrypt.compare(
            rawData.password,
            userWithPassword.password as string,
        )

        expect(passwordIsValid).toBeTruthy()
        expect(passwordIsHashed).toBeTruthy()
    })

    it(`Should return a error for invalid email`, async () => {
        try {
            const dataToCreateUser = {
                email: faker.internet.email(),
                password: faker.internet.password(),
                username: faker.internet.userName(),
            }

            await UsersRepository.create(dataToCreateUser)

            // Shouldnt pass here
            expect(true).toBeFalsy
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

            await UsersRepository.create(dataToCreateUser)

            // Shouldnt pass here
            expect(true).toBeFalsy
        } catch (e) {
            const messageQuoteWeak = e.message.toLowerCase().includes(`weak`)

            expect(messageQuoteWeak).toBeTruthy()
        }
    })
})
