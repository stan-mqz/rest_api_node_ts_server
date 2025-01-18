import {Router} from 'express'
import { body, validationResult } from "express-validator"
import { createProduct } from './handlers/product'

const router = Router()

router.get('/', (req, res) => {
    res.json('Desde GET')
})


router.post('/', 
    
     body('name').notEmpty().withMessage('El nombre del producto no debe estar vacio'),
     body('price')
        .isNumeric().withMessage('Valor no valido')
        .notEmpty().withMessage('El precio del producto no debe estar vacio')
        .custom(value => value > 0).withMessage('El precio no puede ser negativo'),        
    createProduct
)


router.patch('/', (req, res) => {
    res.json('Desde PATCH')
})


router.delete('/', (req, res) => {
    res.json('Desde DELETE')
})


export default router