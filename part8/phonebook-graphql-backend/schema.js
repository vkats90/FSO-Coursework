const typeDefs = `
type User {
  username: String!
  friends: [Person!]!
  id: ID!
}


type Token {
  value: String!
}

  type Address {
    street: String!
    city: String! 
  }
  
  type Person {
    name: String!
    phone: String
    address: Address!
    friendOf: [User!]!
    id: ID!
  }

  enum YesNo {
    YES
    NO
  }
  
  type Subscription {
    personAdded: Person!
  }    
  
  type Query {
    me: User
    personCount: Int!
    allPersons(phone: YesNo): [Person!]!
    findPerson(name: String!): Person
  }

  type Mutation {
    createUser(
      username: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
    addPerson(
      name: String!
      phone: String
      street: String!
      city: String!
    ): Person
    editNumber(
        name: String!
        phone: String!
    ): Person
    addAsFriend(
      name: String!
    ): User
  }
`
module.exports = typeDefs
