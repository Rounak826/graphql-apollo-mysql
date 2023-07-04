const typeDefs = `#graphql
  type BaseResponse {
    status: Int!,
    message: String!,
    success: Boolean!,
  }
  scalar Upload
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
  type FileResponse {
    response: BaseResponse!
    url: String
  }
  type Query {
    getUsers: [Users]

  }
  type Mutation {
    addUser(id:ID!, name:String!, username: String!, password: String!) : Users,
    login(id: ID!, password: String!): LoginResponse,
  }
`;

export default typeDefs;
