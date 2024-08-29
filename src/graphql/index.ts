import { ApolloServer } from "@apollo/server";
import { User } from "./user";

async function createGraphqlServer() {
    // create graphql server
    const gqlServer = new ApolloServer({
        typeDefs: `
            type Query {
                ${User.queries}
            }

            ${User.typeDefs}

            type Mutation {
                ${User.mutations}
            }
        `,
        resolvers: {
            Query: {
                ...User.resolvers.queries,
            },
            Mutation: {
                ...User.resolvers.mutations,
            }
        },
    });

    // start gql server
    await gqlServer.start();

    return gqlServer;
};

export default createGraphqlServer;