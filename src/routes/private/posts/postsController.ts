import { Response } from 'express'

import BaseController from '../../baseController'

import handleError from 'errors/handleError'

import postsService from 'services/postsService'

import IRequestWithCredentials from 'src/interfaces/requestWithCredentials'

class PostsController extends BaseController {
    async post(req: IRequestWithCredentials, res: Response): Promise<void> {
        try {
            const { content } = req.body

            const userId = req.user.id

            const dataToCreatePost = {
                userId,
                content,
            }

            const post = await postsService.createPost(dataToCreatePost)

            res.status(201).send(post)
        } catch (e) {
            handleError(res, e)
        }
    }
}

export default new PostsController()
