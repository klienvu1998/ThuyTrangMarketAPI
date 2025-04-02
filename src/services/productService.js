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

const getProducts = async (productId) => {
    // eslint-disable-next-line no-useless-catch
    try {
        const result = await productModel.getProducts(productId)
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

const update = async (productId, reqBody) => {
    const updateData = {
        ...reqBody,
        slug: slugify(reqBody.name),
        updatedAt: Date.now()
    }
    const updatedProduct = await productModel.update(productId, updateData)
    return updatedProduct
}

const deleteItem = async (productId, reqBody) => {
    return await productModel.deleteOneById(productId)
}

export const productService = {
    createNew,
    getProducts,
    getProductsByCategoryId,
    update,
    deleteItem
}