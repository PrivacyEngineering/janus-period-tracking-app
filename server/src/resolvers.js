/* 
const { GraphQLScalarType, Kind } = require('graphql');
const resolverMap = {
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    parseValue(value) {
      return new Date(value); // value from the client
    },
    serialize(value) {
      return value.getTime(); // value sent to the client
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return new Date(+ast.value); // ast value is always in string format
      }
      return null;
    },
  }),
};  */

 

import { refreshTokens, tryLogin } from './auth';

const resolvers = {
  /* Date: resolverMap, */
  Query: {
    getUser: (parent, { id }, { models }) => models.User.findOne({ where: { id } }),
    allUsers: (parent, args, { models }) => models.User.findAll(),
    getSymptom: (parent, { id }, { models }) => models.Symptom.findOne({ where: { id } }),
    allSymptoms:(parent, args,  { models })  => models.Symptom.findAll(),
    /*  async getSymptom (root, { id }, { models }) {
      return models.Symptom.findByPk(id)
    },  */
    getCycle: (parent, { id }, { models }) => models.Cycle.findOne({ where: { id } }),
    allCycles:(parent, args,  { models })  => models.Cycle.findAll()
  },
  //getter for User, useing Sequelize mixin to return data
  User: {
    async hasSymptom(user) {
      return user.getSymptoms()
    },
    async hasCycle(user) {
      return user.getCycles()
    }
  },
  Symptom: {
     async hasUser(symptom) {
      return symptom.getUser()
    }
  },
  Cycle: {
    async hasUser(cycle) {
     return cycle.getUser()
   }
 },
 Mutation: {
  login: (parent, { username, password }, { models, SECRET }) =>
    tryLogin(username, password, models, SECRET),
  
  refreshTokens: (parent, { token, refreshToken }, { models, SECRET }) =>
    refreshTokens(token, refreshToken, models, SECRET),
} 


};

module.exports = resolvers;