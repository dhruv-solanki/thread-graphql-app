export const typeDefs = `#graphql
    type User {
        id: Int
        firstName: String
        lastName: String
        email: String
        password: String
        profileImageURL: String
    }

    input UserInput {
        firstName: String!
        lastName: String!
        email: String!
        password: String!
        profileImageURL: String
    }

    input UserTokenInput {
        email: String!
        password: String!
    }
`