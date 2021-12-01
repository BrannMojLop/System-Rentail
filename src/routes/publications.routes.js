import { Router } from "express";
const router = Router();
const auth = require('./auth.routes');

// Controllers
import { createPublication, showPublications, getPublication, disablePublication, updatePublication, disablePublications } from "../controllers/publications";

router.get('/', showPublications);

router.get('/:id', getPublication);

router.post('/', auth.requerido, createPublication);

router.put('/:id', auth.requerido, updatePublication);

router.delete('/:id', auth.requerido, disablePublication);

router.delete('/', auth.requerido, disablePublications);


export default router;