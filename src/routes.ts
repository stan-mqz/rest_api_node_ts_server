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
 *@swagger
 *components:
 *  schemas:
 *      Product:
 *         type: object
 *         properties:
 *          id:
 *            type: integer
 *           description: The product ID
 *           example: 1
 *          name:
 *           type: string
 *           description: The product name
 *           example: "Monitor Curvo"
 *         price:
 *           type: number
 *           description: The product price
 *           example: 200
 *        availability:
 *          type: boolean
 *         description: The product availability
 *         example: true
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
