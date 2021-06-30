const { gql } = require('apollo-server')

const typeDefs = gql`
directive @zipsupp on FIELD_DEFINITION
directive @isAuthenticated on OBJECT | FIELD_DEFINITION
directive @hasRole(roles: [Role]) on OBJECT | FIELD_DEFINITION
directive @hasScope(scopes: [String]) on OBJECT | FIELD_DEFINITION
directive @anonymize on FIELD_DEFINITION

enum Role {
  reader
  user
  admin
}


# A library has a branch and books
  type Library {
    branch: String! 
    zip: Int @zipsupp
    books: [Book!]
  }

  # A book has a title and author
  type Book {
    title: String!
    author: Author!
  }

  # An author has a name
  type Author {
    name: String!
  }

  type User {
    id: Int! @anonymize
    firstName: String!
  }

  # Queries can fetch a list of libraries
  type Query {
    libraries: [Library] @hasScope(scopes:["User:Read"])
    user(id: Int!): User
  }

  type Mutation {
    createUser(username: String!, firstName: String!): User! 
  }
`;

module.exports = typeDefs;