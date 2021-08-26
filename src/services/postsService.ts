import PostsRepository from 'repositories/PostsRepository'

class PostsService {
    createPost = PostsRepository.create
}

export default new PostsService()
