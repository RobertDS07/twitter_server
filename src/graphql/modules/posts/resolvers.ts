import { Op } from 'sequelize'

import Post, { post } from '../../../models/Post'
import Coment from '../../../models/Coment'

import verifyToken from '../../../utils/verifyToken'
import User from '../../../models/User'
import Like from '../../../models/Like'

interface createPost {
    token: string
    content: string
}

interface allPosts {
    token: string
    lastId: number
}

interface deletePost {
    token: string
    postId: number
}

interface updatePost {
    token: string
    postId: number
    data: {
        content: string
    }
}

export default {
    createPost: async ({ token, content }: createPost): Promise<boolean> => {
        try {
            const decoded = await verifyToken(token)

            if (!decoded)
                throw new Error(
                    'Houve algo de errado com suas credenciais, tente logar novamente.',
                )

            const { user } = decoded

            const createdPost = await Post.create({ userId: user.id, content })

            if (!createdPost)
                throw new Error(
                    'Erro ao cadastrar seu post, por favor tente novamente',
                )

            return true
        } catch (e) {
            return e
        }
    },

    allPosts: async ({ token, lastId }: allPosts): Promise<post[]> => {
        try {
            const decoded = await verifyToken(token)

            if (!decoded)
                throw new Error(
                    'Houve algo de errado com suas credenciais, tente logar novamente.',
                )

            const { user } = decoded

            const posts = lastId
                ? await Post.findAll({
                      where: { id: { [Op.lt]: lastId } },
                      limit: 10,
                      order: [['id', 'DESC']],
                      include: [User, { model: Coment, include: [User] }],
                  })
                : await Post.findAll({
                      limit: 10,
                      order: [['id', 'DESC']],
                      include: [User, { model: Coment, include: [User] }, Like],
                  })

            console.log(posts)

            posts.forEach(e => {
                if (e.userId === user.id) e.mutable = true

                if (e.coments.length)
                    e.coments.forEach(comment => {
                        if (comment.userId === user.id) comment.mutable = true
                    })
            })

            return posts
        } catch (e) {
            return e
        }
    },

    deletePost: async ({ postId, token }: deletePost): Promise<boolean> => {
        try {
            const decoded = await verifyToken(token)

            if (!decoded)
                throw new Error(
                    'Houve algo de errado com suas credenciais, tente logar novamente.',
                )

            const { user } = decoded

            const deleted = await Post.destroy({
                where: { [Op.and]: [{ id: postId }, { userId: user.id }] },
            })

            if (!deleted)
                throw new Error('Houve algo de errado, tente novamente.')

            return true
        } catch (e) {
            return e
        }
    },

    updatePost: async ({
        token,
        postId,
        data,
    }: updatePost): Promise<boolean> => {
        try {
            const decoded = await verifyToken(token)

            if (!decoded)
                throw new Error(
                    'Houve algo de errado com suas credenciais, tente logar novamente.',
                )

            const { user } = decoded

            const updated = await Post.update(data, {
                where: { [Op.and]: [{ id: postId }, { userId: user.id }] },
            })

            if (!updated)
                throw new Error(
                    'Houve algo de errado com suas credenciais, tente logar novamente.',
                )

            return true
        } catch (e) {
            return e
        }
    },
}
