export default `
    type Query {
        allPosts(token: String! lastId: Int): [Posts!]!
    }

    type Mutation {
        createComment(token: String! postId: Int! content: String!): Boolean!
        deleteComment(token: String! commentId: Int!): Boolean!
        createPost(token: String! content: String!): Boolean!
        deletePost(token: String! postId: Int!): Boolean!
        updatePost(token: String! postId: Int! data: updatePostInput): Boolean!
    }

    input updatePostInput {
        content: String!
    }

    type Posts {
        id: Int!
        content: String!
        mutable: Boolean
        user: User
        coments: [Coment]
    }

    type User {
        name: String!
    }

    type Coment {
        mutable: Boolean
        id: Int!
        userId: Int!
        content: String!
        user: User
    }
`
