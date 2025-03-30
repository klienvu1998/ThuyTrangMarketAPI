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

const getProducts = async (req, res, next) => {
    try {
        const categoryId = req.query.categoryId
        const productId = req.query.productId
        if (categoryId) {
            const result = await productService.getProductsByCategoryId(categoryId)
            res.status(StatusCodes.OK).json(result)
        } else if (productId) {
            const result = await productService.getProducts(categoryId)
            res.status(StatusCodes.OK).json(result)
        } else {
            res.status(StatusCodes.OK).json("")
        }
    } catch (error) {
        next(error)
    }
}

const update = async (req, res, next) => {
    try {
        const productId = req.params.id
        console.log("${productId}")
        const updatedProduct = await productService.update(productId, req.body)
        res.status(StatusCodes.OK).json(updatedProduct)
    } catch (error) {
        next(error)
    }
}

const deleteItem = async (req, res, next) => {
    try {
        const productId = req.params.id
        const result = await productService.deleteItem(productId)
        res.status(StatusCodes.OK).json(result)
    } catch (error) {
        next(error)
    }
}

export const productController = {
    createNew,
    getProducts,
    update,
    deleteItem
}