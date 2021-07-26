const { ApolloServer } = require('apollo-server');
const models = require('../models/index');
const typeDefs = require("./schema");
const resolvers = require("./resolvers");
import { NoiseDirective, GeneralizationDirective, HashDirective, hashingParameters } from "graphql-anonym-directives";
import { insertDummyData } from "./dummyData";
const { defaultFieldResolver } = require('graphql');
import { SchemaDirectiveVisitor } from "graphql-tools";

const dotenv = require("dotenv");

dotenv.config();

NoiseDirective.prototype.getAnonymizationParameter = function(role, result, args, context, info){
    const m = new Map();
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
    m.set(("Researcher, Cycle.start"),{
        typeOfDistribution: "laplace", 
        distributionParameters:{
            mean: 1,
            standardDeviation: 1.5,
        }, 
        valueParameters: {
            addNoiseToUnit: "day"
        }
    });
    
    var lookup = role + ", " + info.parentType.name + "."+ info.fieldName
    var r = m.get(lookup);
    if(!r) console.log("no params");
    return r;
}

GeneralizationDirective.prototype.getAnonymizationParameter = function(role, result, args, context, info) {
    const m = new Map();
    m.set(("Advertiser, Symptom.date"), {
        generalizationParameters: {
            dateUnit: "day"
        }
    });
    var lookup = role + ", " + info.parentType.name + "."+ info.fieldName
    return m.get(lookup);
}

HashDirective.prototype.getAnonymizationParameter = function(role, result, args, context, info){
    const m = new Map();
    m.set(("Advertiser, Symptom.symptom"), hashingParameters.sha256);
    var lookup = role + ", " + info.parentType.name + "."+ info.fieldName
    return m.get(lookup);
}

class DummyDirective extends SchemaDirectiveVisitor{
    visitFieldDefinition(field){
        const {resolve = defaultFieldResolver} = field;
        field.resolve = resolve;
    }
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
        noise: NoiseDirective,
        hash: HashDirective,
        dummy: DummyDirective
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