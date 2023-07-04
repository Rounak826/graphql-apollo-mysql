import { shield, rule, not, and, or, allow } from "graphql-shield";
import rules from "./rules";
import typeDefs from "../schemas/typedefs";
import resolvers from "../schemas/resolvers";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { applyMiddleware } from "graphql-middleware";

const permissions = shield({
  Query: {
    getUsers: rules.isAuthenticated,
  },
  Mutation: {
    addUser: rules.isAuthenticated,
    login: rules.isAuthenticated,
  },
});

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const schemaWithPermissions = applyMiddleware(schema, permissions);
export default schemaWithPermissions;
