import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/apiError'

/* eslint-disable indent */
const { categoryModel } = require('~/models/categoryModel')
const { slugify } = require('~/utils/formatters')

const createNew = async (reqBody) => {
    // eslint-disable-next-line no-useless-catch
    try {
        const newCategory = {
            ...reqBody,
            slug: slugify(reqBody.name)
        }

        const createdCategory = await categoryModel.createNew(newCategory)
        const getCategory = await categoryModel.findOneById(createdCategory.insertedId)

        return getCategory
    } catch (error) {
        throw error
    }
}

const getCategories = async () => {
    // eslint-disable-next-line no-useless-catch
    try {
        const result = await categoryModel.getCategories()
        return result
    } catch (error) {
        throw error
    }
}

const getDetails = async (categoryId) => {
    const result = await categoryModel.getDetails(categoryId)
    if (!result) {
        throw new ApiError(StatusCodes.NOT_FOUND)
    }
    return result
}

export const categoryService = {
    createNew,
    getCategories,
    getDetails
}