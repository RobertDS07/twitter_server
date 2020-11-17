import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import { jwtDecoded } from '../posts/resolvers'

import User, { user } from '../../../models/User'

import verifyData from '../../../utils/verifyData'
import createToken from '../../../utils/createToken'
import verifyToken from '../../../utils/verifyToken'

interface createUser {
    data: {
        email: string
        password: string
        name: string
    }
}

interface login {
    data: {
        email: string
        password: string
    }
}

interface perfil {
    token: string
    userId: number
}

export default {
    createUser: async ({ data }: createUser): Promise<string> => {
        try {
            const toVerifyData = { ...data }
            verifyData<typeof toVerifyData>(toVerifyData)

            const [user, created] = await User.findOrCreate({
                where: { email: data.email },
                defaults: { password: data.password, name: data.name },
            })

            if (!created) throw new Error('Email em uso')

            const userToToken = {
                id: user.id,
                name: user.name,
                email: user.email,
            }

            return createToken<typeof userToToken>(userToToken)
        } catch (e) {
            return e
        }
    },
    login: async ({ data }: login): Promise<string> => {
        try {
            const toVerifyData = { ...data }
            verifyData<typeof toVerifyData>(toVerifyData)

            const user = await User.findOne({ where: { email: data.email } })

            if (!user || !(await bcrypt.compare(data.password, user.password)))
                throw new Error('Credenciais inválidas')

            const userToToken = {
                id: user.id,
                email: user.email,
                name: user.name,
            }

            return createToken<typeof userToToken>(userToToken)
        } catch (e) {
            return e
        }
    },
    verifyToken: async ({ token }: { token: string }): Promise<boolean> => {
        const verified = new Promise<boolean>(res =>
            jwt.verify(token, process.env.SECRET || 'qeoqwi3432fh', err => {
                if (err) return res(false)

                res(true)
            }),
        )

        return await verified
    },
    perfil: async ({ token, userId }: perfil): Promise<user> => {
        try {
            const decoded = await verifyToken<jwtDecoded>(token)

            if (!decoded)
                throw new Error(
                    'Houve algo de errado com suas credenciais, tente logar novamente.',
                )

            const { user } = decoded

            const userPerfil = await User.findOne({
                where: { id: userId },
                include: [{ all: true }],
            })

            if (!userPerfil) throw new Error('Usuário não encontrado')

            if (userPerfil['posts']) {
                userPerfil.posts.forEach(e => {
                    if (e.userId === user.id) e.mutable = true
                })

                userPerfil.posts.sort((a, b) => b.id - a.id)

                return userPerfil
            }

            return userPerfil
        } catch (e) {
            return e
        }
    },
}
