const { gql } = require('apollo-server')


//scalar Date 


const typeDefs = gql`
directive @zipsupp on FIELD_DEFINITION
directive @isAuthenticated on OBJECT | FIELD_DEFINITION
directive @hasRole(roles: [Role]) on OBJECT | FIELD_DEFINITION
directive @hasScope(scopes: [String]) on OBJECT | FIELD_DEFINITION
directive @addNoise on FIELD_DEFINITION

enum Role {
  reader
  user
  admin
}


# A User 
  type User {
    id: ID! @addNoise
    username: String!
    firstName: String
    passwordHash: String
    role: String!
    email: String°
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
    start: Date
    end: Date
  # It's required that every cycle has a user
  # Hence the exclamation (!) to mark it as required
    hasUser: User!
  }

  # A symptom has an id, date of that the symptom appeared and required to have a user
  type Symptom{
    id: ID!
    date: Date
    symptom: String
  # It's required that every Symptom has a user
  # Hence the exclamation (!) to mark it as required
    hasUser: User!
  }


  # Query type defines the available queries for clients to execute
  type Query {
    users: [User] @hasScope(scopes:["User:Read"])
    cycle: [Cycle]
    allSymptoms: [Symptom]
    user(id: Int!): User
  }
  

  type Mutation {
    # TODO add rest of the fields
    createUser(username: String!, email: String!, passwordHash: String!): User!
  }
`;

module.exports = typeDefs;