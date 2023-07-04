import { Users } from "../Entities/Users";
import { comparePasswords, encryptPassword } from "../Utils";

// This resolver retrieves books from the "books" array above.
interface loginInterface {
  id: number;
  password: string;
}
const resolvers = {
  Query: {
    getUsers: () => Users.find(),
  },
  Mutation: {
    addUser: async (parent: any, args: Users) => {
      encryptPassword(args.password).then((en) => (args.password = en));
      Users.insert(args);
      return args;
    },
    login: async (parent: any, args: loginInterface) => {
      const { id, password } = args;
      const user = await Users.findOneBy({ id });
      console.log("login activated", args, user);
      if (user) {
        if (comparePasswords(password, user.password)) {
          return {
            response: {
              status: 200,
              success: true,
              message: "Login successfull!",
            },
            user: user,
          };
        } else {
          return {
            response: {
              status: 200,
              success: false,
              message: "Id or password incorrect",
            },
            user: null,
          };
        }
      } else
        return {
          response: { status: 200, success: false, message: "user not found" },
          user: null,
        };
    },
  },
};
export default resolvers;
