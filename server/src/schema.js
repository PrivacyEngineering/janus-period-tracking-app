const { gql } = require('apollo-server')

const typeDefs = gql`
directive @anony on FIELD_DEFINITION
directive @zipsupp on FIELD_DEFINITION

# A library has a branch and books
  type Library {
    branch: String! @anony
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
    id: Int!
    firstName: String!
  }

  # Queries can fetch a list of libraries
  type Query {
    libraries: [Library]
    user(id: Int!): User
  }
`;

module.exports = typeDefs;