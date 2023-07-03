import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import AppDataSource from "./Config/DB";
import typeDefs from "./schemas/typedefs";
import resolvers from "./schemas/resolvers";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { applyMiddleware } from "graphql-middleware";
import { shield, rule, not, and, or, allow } from "graphql-shield";
import { GetUserByToken } from "./Utils";

const isAuthenticated = rule({ cache: "contextual" })(
  async (parent, args, ctx, info) => {
    console.log({ token: ctx.token });
    return ctx.token !== null;
  }
);

const isAdmin = rule({ cache: "contextual" })(
  async (parent, args, ctx, info) => {
    return ctx.user.role === "admin";
  }
);

const isEditor = rule({ cache: "contextual" })(
  async (parent, args, ctx, info) => {
    return ctx.user.role === "editor";
  }
);

const permissions = shield({
  Query: {
    getUsers: isAuthenticated,
  },
  Mutation: {
    addUser: isAuthenticated,
    login: isAuthenticated,
  },
});

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});
const schemaWithPermissions = applyMiddleware(schema, permissions);
// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  schema: schemaWithPermissions,
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });

startStandaloneServer(server, {
  context: async ({ req }) => {
    const { token } = req.headers;
    GetUserByToken(token);
    return { token };
  },
  listen: { port: 4000 },
}).then(({ url }) => console.log(`🚀  Server ready at: ${url}`));
