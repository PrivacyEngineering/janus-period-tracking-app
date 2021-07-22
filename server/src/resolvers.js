const resolvers = {
  Query: {
    getUser: (parent, { id }, { models }) => models.User.findOne({ where: { id } }),
    allUsers: (parent, args, { models }) => models.User.findAll(),
    getSymptom: (parent, { id }, { models }) => models.Symptom.findOne({ where: { id } }),
    allSymptoms: (parent, { limit },  { models })  => {console.log("Here"); return models.Symptom.findAll({limit: limit})},
    getCycle: (parent, { id }, { models }) => models.Cycle.findOne({ where: { id } }),
    allCycles:(parent, args,  { models })  => models.Cycle.findAll()
  },
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
 }
};

module.exports = resolvers;