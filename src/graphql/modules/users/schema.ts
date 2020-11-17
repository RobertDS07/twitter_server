export default `
    type Query {
        perfil(token: String! userId: Int!): Perfil!
        login(data: loginInput!): String!
        verifyToken(token: String!): Boolean!
    }

    type Mutation {
        createUser(data: createUserInput!): String!
    }

    input loginInput {
        email: String!
        password: String!
    }

    input createUserInput {
        name:String! 
        email:String!
        password: String!
    }

    type Perfil {
        name: String!
        posts: [Posts]
    }

    type Posts {
        id: Int!
        content: String!
        mutable: Boolean
        coment: [Coment]
    }

    type Coment {
        content: String!
        user: User
    }
`
