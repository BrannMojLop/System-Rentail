import { Router } from "express";
const auth = require('./auth.routes');

const router = Router();

// Controllers
import { createCategory, showCategories, getCategory, disableCategory, updateCategory, disableCategories } from "../controllers/categories";

router.get('/', showCategories);

router.get('/:id', getCategory);

router.post('/', auth.requerido, createCategory);

router.put('/:id', auth.requerido, updateCategory);

router.delete('/:id', auth.requerido, disableCategory);

router.delete('/', auth.requerido, disableCategories);


export default router;