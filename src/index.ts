import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";

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
        `,
        resolvers: {
            Query: {
                hello: () => `Hey there, I am GrqphQL server.`
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