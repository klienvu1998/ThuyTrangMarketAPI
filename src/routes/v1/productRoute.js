import { StatusCodes } from 'http-status-codes'
import { productController } from '~/controllers/productController'
import { productValidation } from '~/validations/productValidation'

const express = require('express')
const Router = express.Router()

Router.route('/')
    .get((req, res) => {
        res.status(StatusCodes.OK).json({ message: 'Get list products OK' })
    })
    .post(productValidation.createNew, productController.createNew)


export const productRoute = Router