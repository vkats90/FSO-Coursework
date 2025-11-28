const express = require('express')
const redis = require('../redis')
const router = express.Router()

const configs = require('../util/config')

let visits = 0

/* GET index data. */
router.get('/', async (req, res) => {
  visits++

  res.send({
    ...configs,
    visits,
  })
})

router.get('/statistics', async (req, res) => {
  let todos = await redis.getAsync('added_todos')
  console.log(todos)
  res.status(200).send({
    added_todos: todos,
  })
})

module.exports = router
