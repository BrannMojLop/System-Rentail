import { Router } from "express";

const router = Router();
const auth = require('./auth.routes');

// Controllers
import { createRent, showRents, getRent, updateRent } from "../controllers/rents";

router.get('/', showRents);

router.get('/:id', getRent);

router.post('/', auth.requerido, createRent);

router.put('/:id/:update', auth.requerido, updateRent);


export default router;