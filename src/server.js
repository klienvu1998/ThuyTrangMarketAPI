/* eslint-disable no-unused-vars */

import express from 'express'
import { mapOrder } from '~/utils/sorts.js'
import { CLOSE_DB, CONNECT_DB, GET_DB } from './config/mongodb'
import { env } from '~/config/environment'
import { APIs_V1 } from './routes/v1';
import { errorHandlingMiddleware } from './middlewares/errorHandlingMiddleware';
const exitHook = require('async-exit-hook');

const START_SERVER = () => {
  const app = express()

  // Middleware để bật body json data 
  app.use(express.json())

  app.use('/v1', APIs_V1)

  app.use(errorHandlingMiddleware)

  app.get('/', async (req, res) => {
    console.log(await GET_DB().listCollections().toArray())
    res.end('<h1>Hello</h1>')
  })

  if (env.BUILD_MODE === 'production') {
    app.listen(process.env.PORT, () => {
      console.log(`Hello ${env.AUTHOR}, I am running production at Port:${process.env.PORT}/`)
    })
  } else {
    app.listen(env.APP_PORT, env.APP_HOST, () => {
      console.log(`Hello ${env.AUTHOR}, I am running at ${env.APP_HOST}:${env.APP_PORT}/`)
    })
  }

  exitHook(signal => {
    console.log(`Exit with signal: ${signal}`)
    CLOSE_DB
  })
}

// invoke lập tức function này
(async () => {
  try {
    await CONNECT_DB()
    START_SERVER()
  } catch (error) {
    console.error(error)
    process.exit(0)
  }
})()

// CONNECT_DB()
//   .then(() => console.log('Connected to MongoDB'))
//   .then(() => START_SERVER())
//   .catch(error => {
//     console.error(error)
//     process.exit(0)
//   })
