import { ApolloServer } from "apollo-server-express";
import express from "express";
import AppDataSource from "./Config/DB";
import { upload } from "./Utils";
import path from "path";
import schemaWithPermissions from "./Rules";

const app = express();

app.use("/files", express.static(path.join(__dirname, "uploads")));
app.use("/graphql", (req, _, next) => next());
app.get("/", (req: any, res: any) => res.send("running"));
app.post("/upload", (req, res) => {
  console.log("sadas", req.file);
  upload(req, res, (err: any) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    }
    res.send(req.file);
  });
});

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
let apolloServer = null;
async function startServer() {
  apolloServer = new ApolloServer({
    schema: schemaWithPermissions,
  });
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });
}

//Start Apollo server
startServer();

//Initialize Database Connection
AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });

//Start Express Server
app.listen({ port: 4000 }, () => {
  console.log(`Server started on http://localhost:4000/graphql`);
});
