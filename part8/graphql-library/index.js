const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')
require('dotenv').config()
const { GraphQLError } = require('graphql')

const MONGODB_URI = process.env.MONGODB_URI

console.log('connecting to database')

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

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

const resolvers = {
  Query: {
    me: (root, args, { currentUser }) => {
      return currentUser
    },
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      const books = await Book.find({}).populate('author')
      let filteredBooks = books
      if (args.author) filteredBooks = filteredBooks.filter((b) => b.author.name === args.author)
      if (args.genre) filteredBooks = filteredBooks.filter((b) => b.genres.includes(args.genre))
      return filteredBooks
    },
    allAuthors: async () => await Author.find({}),
  },
  Book: {
    author: async (root) => {
      return Author.findById(root.author)
    },
  },
  Author: {
    bookCount: async (root) => {
      return Book.countDocuments({ author: root.id })
    },
  },
  Mutation: {
    addAuthor: async (root, args) => {
      const author = new Author({ ...args })
      try {
        return author.save()
      } catch (error) {
        throw new GraphQLError('Saving author failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error,
          },
        })
      }
    },
    addBook: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new GraphQLError('wrong credentials', {
          extensions: { code: 'BAD_USER_INPUT' },
        })
      }
      let author = await Author.find({ name: args.author })
      author = author[0]
      if (!author) author = await Author.create({ name: args.author })
      try {
        const book = new Book({ ...args, author: author._id })
        return book.save()
      } catch (error) {
        throw new GraphQLError('Saving book failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.title,
            error,
          },
        })
      }
    },
    editAuthor: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new GraphQLError('wrong credentials', {
          extensions: { code: 'BAD_USER_INPUT' },
        })
      }
      const author = await Author.find({ name: args.name })
      if (!author) return null

      try {
        return Author.findOneAndUpdate(
          { author: args.author },
          { born: args.setBornTo },
          { new: true }
        )
      } catch (error) {
        throw new GraphQLError('Saving author failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.setBornTo,
            error,
          },
        })
      }
    },
    createUser: async (root, args) => {
      const passwordHash = await bcrypt.hash(args.password, 10)
      const user = new User({
        username: args.username,
        passwordHash: passwordHash,
        favoriteGenre: args.favoriteGenre,
      })
      try {
        return user.save()
      } catch (error) {
        throw new GraphQLError('Saving user failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.username,
            error,
          },
        })
      }
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
      const passwordCheck =
        user == null ? false : await bcrypt.compare(args.password, user.passwordHash)
      if (!(user && passwordCheck)) {
        throw new GraphQLError('Login failed, credentials incorrect', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args,
          },
        })
      }
      const tokenUser = {
        username: user.username,
        id: user._id,
      }
      return { value: jwt.sign(tokenUser, process.env.JWT_SECRET, { expiresIn: 60 * 60 }) }
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req, res }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.startsWith('Bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), process.env.JWT_SECRET)
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
