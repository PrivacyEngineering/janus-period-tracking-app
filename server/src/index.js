const { ApolloServer } = require('apollo-server');
const models = require('../models/index');
const typeDefs = require("./schema");
const resolvers = require("./resolvers");
import { IsAuthenticatedDirective, HasRoleDirective, HasScopeDirective } from "graphql-auth-directives";
import { NoiseDirective, GeneralizationDirective } from "graphql-access-control";
import { insertDummyData } from "./dummyData";

const dotenv = require("dotenv");

dotenv.config();

NoiseDirective.prototype.getAnonymizationParameter = function(role, result, args, context, info){
    const m = new Map();
    m.set(("Researcher, Symptom.pain"), {
        typeOfDistribution: "normal", 
        distributionParameters:{
            mean: 0,
            standardDeviation: 1,
        }, 
        valueParameters:{
            isInt: false,
        }
    });
    m.set(("Advertiser, Symptom.pain"), {
        typeOfDistribution: "normal", 
        distributionParameters:{
            mean: 0,
            standardDeviation: 2,
        }, 
        valueParameters:{
            isInt: true,
        }
    });
    m.set(("Researcher, Cycle.start"),{
        typeOfDistribution: "laplace", 
        distributionParameters:{
            mean: 1,
            standardDeviation: 1.5,
        }, 
        valueParameters: {
            addNoiseToUnit: "day"
        }
    })
    var lookup = role + ", " + info.parentType.name + "."+ info.fieldName
    return m.get(lookup);
}

GeneralizationDirective.prototype.getAnonymizationParameter = function(role, result, args, context, info) {
    const m = new Map();
    m.set(("Researcher, Symptom.symptom"), {
        generalizationParameters: {
            hideCharactersFromPosition: 4,
        }
    });
    m.set(("Advertiser, Symptom.symptom"), {
        generalizationParameters: {
            hideCharactersFromPosition: 2,
        }
    });
    var lookup = role + ", " + info.parentType.name + "."+ info.fieldName
    return m.get(lookup);
}

//needed for generation of JWT tokens
const SECRET = process.env.JWT_SECRET;

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({req}) => {
        return {req, models, SECRET}
    },
    schemaDirectives: { 
        generalize: GeneralizationDirective,
        addNoise: NoiseDirective,
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
})