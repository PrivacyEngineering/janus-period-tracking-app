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

const resolvers = {
  Query: {
    libraries() {

      return libraries;
    },
    async user(root, {id}, {models}) {
      return models.User.findById(id);
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
  },
  User: {

  }

};

module.exports = resolvers;