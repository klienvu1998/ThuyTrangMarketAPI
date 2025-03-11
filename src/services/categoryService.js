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

export const categoryService = {
    createNew
}