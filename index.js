import { IsAuthenticatedDirective, HasRoleDirective, HasScopeDirective } from "graphql-auth-directives";
const { ApolloServer, gql, SchemaDirectiveVisitor } = require('apollo-server');
const { defaultFieldResolver } = require('graphql');

const dotenv = require("dotenv");

dotenv.config();

const libraries = [
  {
    branch: 'downtown',
    zip: 10781
  },
  {
    branch: 'riverside',
    zip: 9987
  },
];

// The branch field of a book indicates which library has it in stock
const books = [
  {
    title: 'The Awakening',
    author: 'Kate Chopin',
    branch: 'downtown'
  },
  {
    title: 'Hi',
    author: 'Hello Author',
    branch: 'riverside'
  },
  {
    title: 'City of Glass',
    author: 'Paul Auster',
    branch: 'downtown'
  },
];

// Schema definition
const typeDefs = gql`
directive @anony on FIELD_DEFINITION
directive @zipsupp on FIELD_DEFINITION
directive @isAuthenticated on OBJECT | FIELD_DEFINITION
directive @hasRole(roles: [Role]) on OBJECT | FIELD_DEFINITION
directive @hasScope(scopes: [String]) on OBJECT | FIELD_DEFINITION

enum Role {
  reader
  user
  admin
}

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

  # Queries can fetch a list of libraries
  type Query {
    libraries: [Library] @hasScope(scopes:["User:Read"])
  }
`;

const resolvers = {
  Query: {
    libraries() {

      return libraries;
    }
  },
  Library: {
    books(parent) {

      return books.filter(book => book.branch === parent.branch);
    }
  },
  Book: {

    author(parent) {
      return {
        name: parent.author
      };
    }
  }

};

class AnonyDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field){
    const {resolve = defaultFieldResolver} = field;
    field.resolve = async function(...args){
      const res = await resolve.apply(this,args);
      return "hidden"
    }
  }
}

class ZipDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field){
    const {resolve = defaultFieldResolver} = field;
    field.resolve = async function(...args){
      const res = await resolve.apply(this,args);
      return null
    }
  }
}

const server = new ApolloServer({
  context: ({req}) => {
    return req;
  },
  typeDefs,
  resolvers,
  schemaDirectives: {
    anony: AnonyDirective,
    zipsupp: ZipDirective,
    isAuthenticated: IsAuthenticatedDirective,
    hasRole: HasRoleDirective,
    hasScope: HasScopeDirective
  }, 
})

/**
 * Run Server and pass sample request: 
 * query{libraries{branch,zip, books{title, author{name}}}}
 * 
 * Using auth-directives: Provide JWT in Header of request: 
 * {
  "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJHUkFORHN0YWNrIiwiaWF0IjoxNTQ5MTQ1Mjk0LCJleHAiOjE2OTE3ODEzMDcsImF1ZCI6ImdyYW5kc3RhY2suaW8iLCJzdWIiOiJib2JAbG9ibGF3LmNvbSIsIlJvbGUiOiJBRE1JTiIsIlNjb3BlIjpbIlVzZXI6UmVhZCIsIlVzZXI6Q3JlYXRlIiwiVXNlcjpVcGRhdGUiLCJVc2VyOkRlbGV0ZSJdfQ.WJffOec05r8KuzW76asax1iCzv5q4rwRv9kvFyw7c_E"
}
 */
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
