import { Sequelize } from 'sequelize'
import logger from './utils/logger'
import 'dotenv/config'

const connectionString =
  process.env.NODE_ENV != 'test'
    ? (process.env.POSTGRES_URL as string)
    : (process.env.TEST_POSTGRES_URL as string)

const dialectOptions: any = {}
// Only enable SSL in production; local and test environments use unencrypted connections
/*if (process.env.NODE_ENV === 'production') {
  dialectOptions.ssl = {
    require: true,
    rejectUnauthorized: false,
  }
} else {
  // Explicitly disable SSL for development and test
  dialectOptions.ssl = false
}*/

export const sequelize = new Sequelize(connectionString, {
  dialectOptions,
  // Sequelize expects either a logging function or false
  logging: process.env.NODE_ENV !== 'test' ? console.log : false,
})

export const dbConnect = async () => {
  try {
    await sequelize.authenticate()
    logger.info('Connected to Postgres')
  } catch (error) {
    logger.error("Can't connect to Database", error)
  }
}
