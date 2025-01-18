import { Request, Response } from "express"
import { check, validationResult } from "express-validator"
import Product from "../models/Product.model"

export const createProduct = async (req : Request , res : Response) => {
    

    //Validacion
    await check('name').notEmpty().withMessage('El nombre del producto no debe estar vacio')
    .run(req)
    await check('price')
        .isNumeric().withMessage('Valor no valido')
        .notEmpty().withMessage('El precio del producto no debe estar vacio')
        .custom(value => value > 0).withMessage('El precio no puede ser negativo')
        .run(req)
        

    let errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})    
    }

    const product = await Product.create(req.body)
    res.json({data: product})
}