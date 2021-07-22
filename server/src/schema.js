const { gql } = require('apollo-server')

const typeDefs = gql`
directive @noise on FIELD_DEFINITION
directive @generalize on FIELD_DEFINITION
directive @hash on FIELD_DEFINITION

scalar Dates
enum Role {
  reader
  user
  admin
}


# A User 
  type User {
    id: ID! 
    username: String! 
    firstName: String 
    lastName: String
    email: String
    passwordHash: String
    role: String
    age: Int 
    contraceptive: String
  # A user can have more than one cycle 
  # Hence representing this as an array [Cycle]  
  #[Square Brackets], it's an array of the specified type.
  # If an array has an exclamation point after it, the array cannot be null, but it can be empty  
    hasCycle: [Cycle]!
  # A user can have more than one symptom 
  # Hence representing this as an array [Symptom]! 
    hasSymptom: [Symptom]!
  }


  # A cycle has an id, start and end Date and required to have a user
  type Cycle {
    id: ID!
    start: Dates
    end: Dates
  # It's required that every cycle has a user
  # Hence the exclamation (!) to mark it as required
    hasUser: User!
  }

  # A symptom has an id, date of that the symptom appeared and required to have a user
  type Symptom{
    id: ID!
    date: Dates @generalize
    symptom: String @hash
    pain: Float @noise
  # It's required that every Symptom has a user
  # Hence the exclamation (!) to mark it as required
    hasUser: User!
  }


  # Query type defines the available queries for clients to execute
  type Query {
    #user: [User] @hasScope(scopes:["User:Read"])
    getUser(id: Int!): User!
    allUsers: [User!]!
    getCycle(id: Int!): Cycle!
    #[User!] means that it's okay for a user not to have a Cycle, but if she/he does have, it must be of type Cycle
    allCycles: [Cycle!]!
    getSymptom(id: Int!): Symptom!
    allSymptoms(limit: Int!): [Symptom!]!
  }


  #type Mutation {
    # TODO add rest of the fields
  #  createUser(username: String!, email: String!, passwordHash: String!): User!
#  }
`
;

module.exports = typeDefs;