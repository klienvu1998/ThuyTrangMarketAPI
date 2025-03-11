import { StatusCodes } from 'http-status-codes'
import { productRoute } from './productRoute'

const express = require('express')
const Router = express.Router()

// respond with "hello world" when a GET request is made to the homepage
Router.get('/status', (req, res) => {
    res.status(StatusCodes.OK).json({ message: 'OK' })
})

Router.use('/products', productRoute)

export const APIs_V1 = Router