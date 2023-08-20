const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')

const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const Author = require('./models/author')
const Book = require('./models/book')
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

/*let authors = [
  {
    name: 'Robert Martin',
    id: 'afa51ab0-344d-11e9-a414-719c6709cf3e',
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    id: 'afa5b6f0-344d-11e9-a414-719c6709cf3e',
    born: 1963,
  },
  {
    name: 'Fyodor Dostoevsky',
    id: 'afa5b6f1-344d-11e9-a414-719c6709cf3e',
    born: 1821,
  },
  {
    name: 'Joshua Kerievsky', // birthyear not known
    id: 'afa5b6f2-344d-11e9-a414-719c6709cf3e',
  },
  {
    name: 'Sandi Metz', // birthyear not known
    id: 'afa5b6f3-344d-11e9-a414-719c6709cf3e',
  },
]


 * English:
 * It might make more sense to associate a book with its author by storing the author's id in the context of the book instead of the author's name
 * However, for simplicity, we will store the author's name in connection with the book


let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    id: 'afa5b6f4-344d-11e9-a414-719c6709cf3e',
    genres: ['refactoring'],
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    id: 'afa5b6f5-344d-11e9-a414-719c6709cf3e',
    genres: ['agile', 'patterns', 'design'],
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: 'afa5de00-344d-11e9-a414-719c6709cf3e',
    genres: ['refactoring'],
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    id: 'afa5de01-344d-11e9-a414-719c6709cf3e',
    genres: ['refactoring', 'patterns'],
  },
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    id: 'afa5de02-344d-11e9-a414-719c6709cf3e',
    genres: ['refactoring', 'design'],
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: 'afa5de03-344d-11e9-a414-719c6709cf3e',
    genres: ['classic', 'crime'],
  },
  {
    title: 'The Demon ',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: 'afa5de04-344d-11e9-a414-719c6709cf3e',
    genres: ['classic', 'revolution'],
  },
] */

const typeDefs = `
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
}
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      const books = await Book.find({})
      console.log(books)
      return books
      //  if (args.author) filteredBooks = filteredBooks.filter((b) => b.author === args.author)
      //  if (args.genre) filteredBooks = filteredBooks.filter((b) => b.genres.includes(args.genre))
      //  return filteredBooks
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
            invalidArgs: args,
            error,
          },
        })
      }
    },
    addBook: async (root, args) => {
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
            invalidArgs: args,
            error,
          },
        })
      }
    },
    editAuthor: async (root, args) => {
      const author = await Author.find({ name: args.name })
      if (!author) return null

      try {
        return Author.findOneAndUpdate(
          { author: args.author },
          { born: args.setBornTo },
          { new: true }
        )
      } catch (error) {
        throw new GraphQLError('Saving number failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.setBornTo,
            error,
          },
        })
      }
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
