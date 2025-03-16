import { StatusCodes } from 'http-status-codes'
import { categoryController } from '~/controllers/categoryController'
import { categoryValidation } from '~/validations/categoryValidation'

const express = require('express')
const Router = express.Router()

Router.route('/')
    .get(categoryController.getCategories)
    .post(categoryValidation.createNew, categoryController.createNew)

Router.route('/:categoryId')
    .get(categoryController.getDetails)
    .put() // update

export const categoryRoute = Router