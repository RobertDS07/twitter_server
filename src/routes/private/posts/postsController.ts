import { Response } from 'express'

import BaseController, { IFindQuery } from '../../_baseController'

import handleError from 'errors/handleError'

import postsService from 'services/postsService'

import { IRequestWithCredentials } from 'src/interfaces/requests'

interface IPostBody {
    content: string
}

class PostsController extends BaseController {
    async find(
        req: IRequestWithCredentials<null, IFindQuery>,
        res: Response,
    ): Promise<void> {
        try {
            const { id: userId } = req.user

            const { order, limit, skip, ...where } = req.query

            const paginatedPosts = await postsService.findPosts(userId, {
                order,
                limit,
                skip,
                where,
            })

            res.status(200).send(paginatedPosts)
        } catch (e: any) {
            handleError(res, e)
        }
    }

    async post(
        req: IRequestWithCredentials<IPostBody>,
        res: Response,
    ): Promise<void> {
        try {
            const { id: userId } = req.user

            const { content } = req.body

            const dataToCreatePost = {
                userId,
                content,
            }

            const post = await postsService.createPost(dataToCreatePost)

            res.status(201).send(post)
        } catch (e: any) {
            handleError(res, e)
        }
    }
}

export default new PostsController()
