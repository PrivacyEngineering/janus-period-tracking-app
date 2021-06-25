const { ApolloServer } = require('apollo-server');
const { Sequelize } = require('sequelize');
const models = require('../models/index');
const typeDefs = require("./schema");
const resolvers = require("./resolvers");
const {ZipDirective, AnonyDirective} = require("./directives")

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

models.sequelize.sync().then(_ => {
  return server.listen()}
).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
})