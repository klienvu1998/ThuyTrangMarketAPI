/* eslint-disable indent */
/* eslint-disable quotes */
import { StatusCodes } from "http-status-codes";
import { productService } from "~/services/productService";
const Joi = require("joi");

const createNew = async (req, res, next) => {
    try {

        const createProduct = await productService.createNew(req.body)

        console.log('req.body', req.body)
        res.status(StatusCodes.CREATED).json(createProduct)
    } catch (error) {
        // truyền lỗi ra ngoài
        next(error)

        // console.log(error)
        // res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        //     message: new Error(error).message
        // })
    }
}

export const productController = {
    createNew
}