import { Sequelize } from 'sequelize'
import logger from './utils/logger'

export const sequelize = new Sequelize(
  process.env.NODE_ENV == 'test'
    ? (process.env.POSTGRES_URL as string)
    : (process.env.TEST_POSTGRES_URL as string),
  {
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  }
)

export const dbConnect = async () => {
  try {
    await sequelize.authenticate()
    logger.info('Connected to Postgres')
  } catch (error) {
    logger.error("Can't connect to Database", error)
  }
}
