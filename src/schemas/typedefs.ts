const typeDefs = `#graphql
  type Users {
    id: ID!
    name: String!,
    username: String!,
    password: String!,

  }
  type Query {
    Users: [Users]
  }
  type Mutation {
    addUser(id:ID!, name:String!, username: String!, password: String!) : Users
  }
`;

export default typeDefs;
