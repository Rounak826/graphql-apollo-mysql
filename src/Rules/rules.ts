import { rule } from "graphql-shield";
const rules = {
  isAuthenticated: rule({ cache: "contextual" })(
    async (parent, args, ctx, info) => {
      console.log({ token: ctx.token });
      return ctx.token !== null;
    }
  ),
  isAdmin: rule({ cache: "contextual" })(async (parent, args, ctx, info) => {
    return ctx.user.role === "editor";
  }),
  isEditor: rule({ cache: "contextual" })(async (parent, args, ctx, info) => {
    return ctx.user.role === "admin";
  }),
};

export default rules;
