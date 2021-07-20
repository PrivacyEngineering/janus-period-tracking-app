const { ApolloServer } = require('apollo-server');
const models = require('../models/index');
const typeDefs = require("./schema");
const resolvers = require("./resolvers");
const {ZipDirective} = require("./directives")
import { IsAuthenticatedDirective, HasRoleDirective, HasScopeDirective } from "graphql-auth-directives";
import { NoiseDirective } from "graphql-access-control";
import { insertDummyData } from "./dummyData";

const dotenv = require("dotenv");

dotenv.config();

//const SECRET = process.env;
const SECRET = 'aslkdjlkaj10830912039jlkoaiuwerasdjflkasd';
NoiseDirective.prototype.getArgumentForRoles = function(){
  //add here { role -> Arguments }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({req}) => {
    return {req, models, SECRET}
  },
  schemaDirectives: { 
    addNoise: NoiseDirective,
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
  insertDummyData(models);
})
.then(_ => {
  //console.log("server listen")
  return server.listen()}
).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
  console.log(SECRET)
})