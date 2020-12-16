import { Op } from 'sequelize'

import Coment from '../../../models/Coment'

import verifyToken from '../../../utils/verifyToken'

interface createComment {
    token: string
    postId: number
    content: string
}

interface deleteComment {
    token: string
    commentId: number
}

export default {
    createComment: async ({
        token,
        postId,
        content,
    }: createComment): Promise<boolean> => {
        try {
            const decoded = await verifyToken(token)

            if (!decoded)
                throw new Error(
                    'Houve algo de errado com suas credenciais, tente logar novamente.',
                )

            const { user } = decoded

            const comment = await Coment.create({
                postId,
                content,
                userId: user.id,
            })

            if (!comment)
                throw new Error(
                    'Houve algo de errado ao cadastrar o comentário, tente novamente',
                )

            return true
        } catch (e) {
            return e
        }
    },

    deleteComment: async ({
        token,
        commentId,
    }: deleteComment): Promise<boolean> => {
        try {
            const decoded = await verifyToken(token)

            const deleted = await Coment.destroy({
                where: {
                    [Op.and]: [{ id: commentId }, { userId: decoded.user.id }],
                },
            })

            if (!deleted)
                throw new Error(
                    'Houve algo de errado ao cadastrar o comentário, tente novamente',
                )

            return true
        } catch (e) {
            return e
        }
    },
}
