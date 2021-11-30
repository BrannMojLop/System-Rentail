import { Router } from "express";
const auth = require('./auth.routes');

const router = Router();

// Controllers
import { createProduct, showProducts, getProduct, disableProduct, updateProduct, disableProducts } from "../controllers/products";

router.get('/', showProducts);

router.get('/:id', getProduct);

router.post('/', auth.requerido, createProduct);

router.put('/:id', auth.requerido, updateProduct);

router.delete('/:id', auth.requerido, disableProduct);

router.delete('/', auth.requerido, disableProducts);


export default router;