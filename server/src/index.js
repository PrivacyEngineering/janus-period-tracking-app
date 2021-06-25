const { ApolloServer } = require('apollo-server');
const { Sequelize } = require('sequelize');
const models = require('../models');
const typeDefs = require("./schema");
const resolvers = require("./resolvers");
const {ZipDirective, AnonyDirective} = require("./directives")

const sequelize = new Sequelize('postgres://user:password@localhost:5432/period-tracking')

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context:{
    models
  },
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
