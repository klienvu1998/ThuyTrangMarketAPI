import { productModel } from '~/models/productModel'
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

export const productService = {
    createNew
}