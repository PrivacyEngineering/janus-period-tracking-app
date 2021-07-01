
import { Kind, GraphQLScalarType } from 'graphql';

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
};


const users = [
  {
    id: '1',
    name: 'Elizabeth Bennet'
  },
  {
    id: '2',
    name: 'Fitzwilliam Darcy'
  }
];

const resolvers = {
  Query: {
    //for the  hard coded User array
    users() {

      return users;
    },
    async allUsers(root, { id }, { models }) {
      return models.User.findAll();
    }, 
    async user(root, {id}, {models}) {
      return models.User.findById(id);
    },
    async cycle(root, args, { models }) {
      return models.Cycle.findById(id);
    },
    async allSymptoms(root, { id }, { models }) {
      return models.Symptom.findAll();
    },
  },

  User: {
    async hasCycle(user) {
      return user.getCycle();
    },
    async hasSymptom(user) {
      return user.getSymptom();
    },
  },
  Cycle: {
    async user(cycle) {
      return cycle.getUser();
    },
  },
  Symptom: {
    async user(symptom) {
      return symptom.getUser();
    },
  },
  

  Mutation:{
    createUser: (parent, args, {models}) => models.User.create(args),
  }

};

module.exports = resolvers;