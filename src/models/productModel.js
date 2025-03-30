import { GET_DB } from '~/config/mongodb'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from './validator'
import { ObjectId, ReturnDocument } from 'mongodb'
import ApiError from '~/utils/apiError'

const Joi = require('joi')

const PRODUCT_COLLECTION_NAME = 'products'
const PRODUCT_COLLECTION_SCHEMA = Joi.object({
    name: Joi.string().required().min(3).trim().strict(),
    clientId: Joi.string().required().trim().strict(),
    categoryId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
    description: Joi.string().trim().optional(),
    price: Joi.number().required().strict(),
    slug: Joi.string().required().min(3).trim().strict(),
    createAt: Joi.date().timestamp('javascript').default(Date.now),
    updatedAt: Joi.date().timestamp('javascript').default(null),
    _destroy: Joi.boolean().default(false)
})

const createNew = async (data) => {
    try {
        return await GET_DB().collection(PRODUCT_COLLECTION_NAME).insertOne(data)
    } catch (error) {
        throw new Error(error)
    }
}

const findOneById = async (id) => {
    try {
        return await GET_DB().collection(PRODUCT_COLLECTION_NAME).findOne({
            _id: new ObjectId(id)
        })
    } catch (error) {
        throw new Error(error)
    }
}

const getProducts = async (productId) => {
    try {
        const products = await GET_DB().collection(PRODUCT_COLLECTION_NAME).findOne({ _id: new ObjectId(productId) })
        return products
    } catch (error) {
        // Handle database errors
        throw new Error(error)
    }
}

const getProductsByCategoryId = async (categoryId) => {
    try {
        const products = await GET_DB().collection(PRODUCT_COLLECTION_NAME).find({ categoryId: categoryId }).toArray()
        return products
    } catch (error) {
        // Handle database errors
        throw new Error(error)
    }
}

const update = async (productId, updateData) => {
    try {
        const result = await GET_DB().collection(PRODUCT_COLLECTION_NAME).findOneAndUpdate(
            { _id: new ObjectId(productId) },
            { $set: updateData },
            { returnDocument: 'after' }
        )
        return result
    } catch (error) {
        throw new Error(error)
    }
}

const deleteOneById = async (productId) => {
    try {
        const result = await GET_DB().collection(PRODUCT_COLLECTION_NAME).deleteOne({ _id: new ObjectId(productId) })
        return result
    } catch (error) {
        throw new Error(error)
    }
}

export const productModel = {
    PRODUCT_COLLECTION_NAME,
    PRODUCT_COLLECTION_SCHEMA,
    createNew,
    findOneById,
    getProducts,
    getProductsByCategoryId,
    update,
    deleteOneById
}