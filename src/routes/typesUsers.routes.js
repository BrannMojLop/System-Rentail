import { Router } from "express";
const auth = require('./auth.routes');

const router = Router();

// Controllers
import { createTypeUser, showTypesUsers, getTypeUser, disableTypeUser, updateTypeUser, disableTypesUsers } from "../controllers/typesUsers";

router.get('/', auth.requerido, showTypesUsers);

router.get('/:id', auth.requerido, getTypeUser);

router.post('/', auth.requerido, createTypeUser);

router.put('/:id', auth.requerido, updateTypeUser);

router.delete('/:id', auth.requerido, disableTypeUser);

router.delete('/', auth.requerido, disableTypesUsers);


export default router;
