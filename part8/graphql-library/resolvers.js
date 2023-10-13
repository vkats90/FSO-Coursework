const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { GraphQLError } = require('graphql')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')

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
    allAuthors: async () => {
      return await Author.find({})
    },
  },
  Book: {
    author: async (root) => {
      return Author.findById(root.author)
    },
  },
  Author: {
    bookCount: async (root, args, { books }) => {
      return books ? books.filter((b) => b.author.name === root.name).length : 0
      // old solution below, new solution above to solve n+1 problem
      //return Book.countDocuments({ author: root.id })
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
        await book.save()
        pubsub.publish('BOOK_ADDED', { bookAdded: book })
        return book
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
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator('BOOK_ADDED'),
    },
  },
}

module.exports = resolvers
