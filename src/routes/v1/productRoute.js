import { StatusCodes } from 'http-status-codes'
import { productController } from '~/controllers/productController'
import { productValidation } from '~/validations/productValidation'

const express = require('express')
const Router = express.Router()

Router.route('/')
    .get(productController.getProducts)
    .post(productValidation.createNew, productController.createNew)


export const productRoute = Router