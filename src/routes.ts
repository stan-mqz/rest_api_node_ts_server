import { Router } from "express";
import { body, param } from "express-validator";
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateAvailabity,
  updateProduct,
} from "./handlers/product";
import { handleInputErrors } from "./middleware";

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The product ID
 *           example: 1
 *         name:
 *           type: string
 *           description: The product name
 *           example: "Monitor Curvo"
 *         price:
 *           type: number
 *           description: The product price
 *           example: 200
 *         availability:
 *           type: boolean
 *           description: The product availability
 *           example: true
 */

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get all products
 *     tags:
 *       - Products
 *     description: Retrieve a list of products
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Get a product by ID
 *     tags:
 *       - Products
 *     description: Return a product based on a single ID
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Product ID
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /products:
 *   post:
 *      summary: Create a new product
 *      tags:
 *          - Products
 *      description: Returns a new record in the database
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                            name:
 *                                type: string
 *                                example: "Monitor"
 *                            price:
 *                               type: number
 *                               example: 3.99
 *      responses:
 *       201:
 *          description: Successful response
 *          content:
 *               application/json:
 *                      schema:
 *                          ref: '#/components/schemas/Product'
 *       400:
 *            description: Bad Request - Invalid Input Data
 *
 *
 */

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Updates a product with user input
 *     tags:
 *       - Products
 *     description: Returns the updated product
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Product ID
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Monitor"
 *               price:
 *                 type: number
 *                 example: 3.99
 *               availability:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Bad Request - Invalid ID or Invalid Input Data
 *       404:
 *         description: Product Not Found
 */

/**
 * @swagger
 * /products/{id}:
 *   patch:
 *     summary: Update product availability
 *     tags:
 *       - Products
 *     description: Returns the updated availability
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Product ID
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Bad Request - Invalid ID or Invalid Input Data
 *       404:
 *         description: Product Not Found
 */


router.get("/", getProducts);

// /:Cualquier nombre de variable
router.get(
  "/:id",
  param("id").isInt().withMessage("Valor no valido"),
  handleInputErrors,
  getProductById
);

router.post(
  "/",
  body("name")
    .notEmpty()
    .withMessage("El nombre del producto no debe estar vacio"),
  body("price")
    .isNumeric()
    .withMessage("Valor no valido")
    .notEmpty()
    .withMessage("El precio del producto no debe estar vacio")
    .custom((value) => value > 0)
    .withMessage("El precio no puede ser negativo"),
  handleInputErrors,
  createProduct
);

router.put(
  "/:id",
  param("id").isInt().withMessage("Valor no valido"),
  body("name")
    .notEmpty()
    .withMessage("El nombre del producto no debe estar vacio"),
  body("price")
    .isNumeric()
    .withMessage("Valor no valido")
    .notEmpty()
    .withMessage("El precio del producto no debe estar vacio")
    .custom((value) => value > 0)
    .withMessage("El precio no puede ser negativo"),
  body("availability").isBoolean().withMessage("Valor no valido"),
  handleInputErrors,
  updateProduct
);

router.patch(
  "/:id",
  param("id").isInt().withMessage("Valor no valido"),
  handleInputErrors,
  updateAvailabity
);

router.delete(
  "/:id",
  param("id").isInt().withMessage("Valor no valido"),
  handleInputErrors,
  deleteProduct
);

export default router;
