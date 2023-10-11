const typeDefs = `
type User {
  username: String!
  favoriteGenre: String!
  id: ID!
}
type Token {
  value: String!
}
type Author {
    name: String!
    born: Int
    id:ID!
    bookCount: Int!
}
type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]
}
type Query {
    me: User
    bookCount: Int!
    authorCount: Int!
    allBooks(author:String,genre:String): [Book!]!
    allAuthors: [Author!]!
}
type Mutation {
  addBook(
    title: String!
    author: String!
    published: Int!
    genres: [String!]!
  ): Book
  addAuthor(
    name:String!
    born: Int
  ): Author
  editAuthor(
    name: String!
    setBornTo: Int!
  ): Author
  createUser(
    username: String!
    password: String!
    favoriteGenre: String!
  ): User
  login(
    username: String!
    password: String!
  ): Token
}
`
module.exports = typeDefs
