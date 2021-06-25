const { ApolloServer } = require('apollo-server');
const { Sequelize } = require('sequelize');
const models = require('../models/index');
const typeDefs = require("./schema");
const resolvers = require("./resolvers");
const {ZipDirective, AnonyDirective} = require("./directives")
import { IsAuthenticatedDirective, HasRoleDirective, HasScopeDirective } from "graphql-auth-directives";
const dotenv = require("dotenv");

dotenv.config();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({req}) => {
    return {req, models}
  },
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

models.sequelize.sync().then(_ => {
  return server.listen()}
).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
})