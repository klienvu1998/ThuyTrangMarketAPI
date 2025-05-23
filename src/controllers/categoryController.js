/* eslint-disable indent */
/* eslint-disable quotes */
import { StatusCodes } from "http-status-codes";
import { categoryService } from "~/services/categoryService";
const Joi = require("joi");

const createNew = async (req, res, next) => {
    try {

        const createCategory = await categoryService.createNew(req.body)

        console.log('req.body', req.body)
        res.status(StatusCodes.CREATED).json(createCategory)
    } catch (error) {
        // truyền lỗi ra ngoài
        next(error)

        // console.log(error)
        // res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        //     message: new Error(error).message
        // })
    }
}

const getCategories = async (req, res, next) => {
    try {
        const result = await categoryService.getCategories()
        res.status(StatusCodes.OK).json(result)
    } catch (error) {
        next(error)
    }
}

const getDetails = async (req, res, next) => {
    try {
        const categoryId = req.params.categoryId
        const result = await categoryService.getDetails(categoryId)
        res.status(StatusCodes.OK).json(result)
    } catch (error) {
        next(error)
    }
}

export const categoryController = {
    createNew,
    getCategories,
    getDetails
}