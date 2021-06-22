const { ApolloServer, gql, SchemaDirectiveVisitor } = require('apollo-server');
const { defaultFieldResolver } = require('graphql');

const libraries = [
  {
    branch: 'downtown',
    zip: 10781
  },
  {
    branch: 'riverside',
    zip: 09987
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
    libraries: [Library]
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
  typeDefs,
  resolvers,
  schemaDirectives: {
    anony: AnonyDirective,
    zipsupp: ZipDirective,
  }, 
})

/**
 * Run Server and pass sample request: 
 * query{libraries{branch,zip, books{title, author{name}}}}
 */
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
