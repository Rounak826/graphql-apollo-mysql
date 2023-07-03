interface Response {}
const typeDefs = `#graphql
  type BaseResponse {
    status: Int!,
    message: String!,
    success: Boolean!,
  }
  type Users {
    id: ID!
    name: String!,
    username: String!,
    password: String!,

  }
  type LoginResponse {
    response: BaseResponse!
    token: String,
    user: Users

  }
  type Query {
    getUsers: [Users]

  }
  type Mutation {
    addUser(id:ID!, name:String!, username: String!, password: String!) : Users,
    login(id: ID!, password: String!): LoginResponse
  }
`;

export default typeDefs;
