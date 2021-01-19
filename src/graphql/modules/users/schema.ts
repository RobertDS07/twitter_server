export default `
    type Mutation {
        createUser(data: createUserInput!): String!
        login(data: loginInput!): String!
        verifyToken(token: String!): Boolean!
        perfil(token: String! userId: Int!): Perfil!
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
        coments: [Coment]
    }

    type Coment {
        content: String!
        user: User
    }
`
