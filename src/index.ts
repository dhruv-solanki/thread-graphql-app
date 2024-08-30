import express from "express";
import { expressMiddleware } from "@apollo/server/express4";
import createGraphqlServer from "./graphql";
import contextMiddleware from "./middlewares/context";

async function init() {
    const app = express();
    const PORT = Number(process.env.PORT) || 8000;

    // parse request body as json object
    app.use(express.json());

    const gqlServer = await createGraphqlServer();

    // add graphql server as middleware for handling /graphql requests
    app.use("/graphql", expressMiddleware(gqlServer, { 
        context: contextMiddleware 
    }));

    app.get("/", (req, res) => {
        res.json({ message: "Thread app server is running" });
    });

    // express server started and listening on PORT
    app.listen(PORT, () => console.log(`Server started at PORT: ${PORT}`));
}

init();