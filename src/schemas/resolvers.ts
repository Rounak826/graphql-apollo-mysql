import { Users } from "../Entities/Users";

// This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    Users: () => Users.find(),
  },
  Mutation: {
    addUser: async (parent: any, args: Users) => {
      Users.insert(args);
      return args;
    },
  },
};
export default resolvers;
