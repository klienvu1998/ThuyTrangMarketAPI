import { StatusCodes } from 'http-status-codes'
import { productModel } from '~/models/productModel'
import ApiError from '~/utils/apiError'
import { slugify } from '~/utils/formatters'


const createNew = async (reqBody) => {
    // eslint-disable-next-line no-useless-catch
    try {
        const newProduct = {
            ...reqBody,
            slug: slugify(reqBody.name)
        }

        const createdProduct = await productModel.createNew(newProduct)
        const getProduct = await productModel.findOneById(createdProduct.insertedId)

        return getProduct
    } catch (error) {
        throw error
    }
}

const getProducts = async (categoryId) => {
    // eslint-disable-next-line no-useless-catch
    try {
        const result = await productModel.getProducts(categoryId)
        return result
    } catch (error) {
        throw error
    }
}

const getProductsByCategoryId = async (categoryId) => {
    // eslint-disable-next-line no-useless-catch
    try {
        const result = await productModel.getProductsByCategoryId(categoryId)
        if (!result) {
            throw ApiError(StatusCodes.NOT_FOUND)
        }
        return result
    } catch (error) {
        throw error
    }
}

export const productService = {
    createNew,
    getProducts,
    getProductsByCategoryId
}