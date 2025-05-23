import { GET_DB } from '~/config/mongodb'
import { OBJECT_ID_RULE_MESSAGE } from './validator'
import { ObjectId } from 'mongodb'
import { productModel } from './productModel'

const Joi = require('joi')

const CATEGORY_COLLECTION_NAME = 'categories'
const CATEGORY_COLLECTION_SCHEMA = Joi.object({
  name: Joi.string().required().min(3).trim().strict()
})

const createNew = async (data) => {
  try {
    return await GET_DB().collection(CATEGORY_COLLECTION_NAME).insertOne(data)
  } catch (error) {
    throw new Error(error)
  }
}

const findOneById = async (id) => {
  try {
    return await GET_DB().collection(CATEGORY_COLLECTION_NAME).findOne({
      _id: new ObjectId(id)
    })
  } catch (error) {
    throw new Error(error)
  }
}

const getDetails = async (categoryId) => {
  try {
    const result = await GET_DB().collection(CATEGORY_COLLECTION_NAME).aggregate([
      {
        $match: {
          _id: new ObjectId(categoryId),
          $or: [
            { _destroy: false },
            { _destroy: { $exists: false } }
          ]
        }
      },
      {
        $lookup: {
          from: productModel.PRODUCT_COLLECTION_NAME,
          localField: '_id',
          foreignField: 'categoryId',
          as: 'products'
        }
      }
    ]).toArray();

    console.log(result)
    return result[0] || {}
  } catch (error) {
    throw new Error(error)
  }
}

const getCategories = async () => {
  try {
    const result = await GET_DB().collection(CATEGORY_COLLECTION_NAME).find({}).toArray()
    return result
  } catch (error) {
    throw new Error(error)
  }
}

export const categoryModel = {
  CATEGORY_COLLECTION_NAME,
  CATEGORY_COLLECTION_SCHEMA,
  createNew,
  findOneById,
  getDetails,
  getCategories
}