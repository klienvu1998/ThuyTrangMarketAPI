/* eslint-disable indent */

import { MongoClient, ServerApiVersion } from 'mongodb'
import { env } from '~/config/environment'

let marketDBInstance = null

// Dùng để kết nối tới mongoDB
const mongoClientInstance = new MongoClient(env.MONGODB_URI, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
    }
})

export const CONNECT_DB = async () => {
    await mongoClientInstance.connect()

    marketDBInstance = mongoClientInstance.db(env.DATABASE_NAME)
}

export const GET_DB = () => {
    if (!marketDBInstance) throw new Error('Must connect to DB first')

    return marketDBInstance
}

export const CLOSE_DB = async () => {
    await mongoClientInstance.close()
}