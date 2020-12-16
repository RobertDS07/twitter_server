import { Op } from 'sequelize'

import Like from '../../../models/Like'

import verifyToken from '../../../utils/verifyToken'

interface checkLike {
    token: string
    postId: number
}

export default {
    checkLike: async ({
        token,
        postId,
    }: checkLike): Promise<boolean | Error> => {
        try {
            const decoded = await verifyToken(token)

            if (!decoded)
                throw new Error(
                    'Houve algo de errado com suas credenciais, tente logar novamente.',
                )

            const { user } = await verifyToken(token)

            const [like, created] = await Like.findOrCreate({
                where: { [Op.and]: [{ postId }, { userId: user.id }] },
                defaults: { postId, userId: user.id },
            })

            if (!created) {
                await like.destroy()
                return true
            }

            return true
        } catch (e) {
            return e
        }
    },
}
