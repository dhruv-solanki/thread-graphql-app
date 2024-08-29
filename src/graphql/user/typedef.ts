export const typeDefs = `#graphql
    type User {
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
`