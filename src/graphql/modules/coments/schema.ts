export default `
    type Mutation {
        createComment(token: String! postId: Int! content: String!): Boolean!
        deleteComment(token: String! commentId: Int!): Boolean!
    }
`
