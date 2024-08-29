import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { prismaClient } from "./lib/DB";
import e from "express";

async function init() {
    const app = express();
    const PORT = Number(process.env.PORT) || 8000;

    // parse request body as json object
    app.use(express.json());

    // create graphql server
    const gqlServer = new ApolloServer({
        typeDefs: `
            type Query {
                hello: String
            }

            input UserInput {
                firstName: String!
                lastName: String!
                email: String!
                password: String!
            }

            type Mutation {
                createUser(userInput: UserInput!): Boolean
            }
        `,
        resolvers: {
            Query: {
                hello: () => `Hey there, I am GrqphQL server.`
            },
            Mutation: {
                createUser: async (_, { 
                    userInput,
                }: { 
                    userInput: {
                        firstName: string,
                        lastName: string,
                        email: string,
                        password: string,
                    }
                }) => {
                    await prismaClient.user.create({
                        data: {
                            firstName: userInput.firstName,
                            lastName: userInput.lastName,
                            email: userInput.email,
                            password: userInput.password,
                        }
                    });
                    return true;
                }
            }
        },
    });

    // start gql server
    await gqlServer.start();

    // add graphql server as middleware for handling /graphql requests
    app.use("/graphql", expressMiddleware(gqlServer));

    app.get("/", (req, res) => {
        res.json({ message: "Thread app server is running" });
    });

    // express server started and listening on PORT
    app.listen(PORT, () => console.log(`Server started at PORT: ${PORT}`));
}

init();