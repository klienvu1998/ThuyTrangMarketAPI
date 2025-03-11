/* eslint-disable quotes */
import { StatusCodes } from "http-status-codes"
import ApiError from "~/utils/apiError"
const Joi = require("joi")

const createNew = async (req, res, next) => {
    const correctCondition = Joi.object({
        name: Joi.string().required().min(3).trim().strict(),
        categoryId: Joi.number().integer().required().strict(),
        description: Joi.string().required().min(3).trim().strict(),
        price: Joi.number().required().strict()
    })
    try {
        await correctCondition.validateAsync(req.body, { abortEarly: false })
        // next()
    } catch (error) {
        const errorMsg = new Error(error).message
        const customError = new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, errorMsg)
        next(customError)
    }
}

export const productValidation = {
    createNew
}