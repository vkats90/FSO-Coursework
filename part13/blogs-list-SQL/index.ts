import app from './app'
import logger from './utils/logger'
import { dbConnect } from './dbConnection'

const PORT = process.env.PORT

;(async () => {
  await dbConnect()
  app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`)
  })
})()
