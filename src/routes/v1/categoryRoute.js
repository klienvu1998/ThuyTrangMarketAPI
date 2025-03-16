import { StatusCodes } from 'http-status-codes'
import { categoryController } from '~/controllers/categoryController'
import { categoryValidation } from '~/validations/categoryValidation'

const express = require('express')
const Router = express.Router()

Router.route('/')
    .get(categoryController.getCategories)
    .post(categoryValidation.createNew, categoryController.createNew)


export const categoryRoute = Router