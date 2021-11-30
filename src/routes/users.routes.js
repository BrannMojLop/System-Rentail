import { Router } from "express";
const auth = require('./auth.routes');

const router = Router();

// Controllers
import { createUser, showUsers, getUser, disableUser, updateUser, disableUsers, login } from "../controllers/users";


router.get('/', auth.requerido, showUsers);

router.get('/:id', auth.requerido, getUser);

router.post('/', createUser);

router.post('/login', login);

router.put('/:id', auth.requerido, updateUser);

router.delete('/:id', auth.requerido, disableUser);

router.delete('/', auth.requerido, disableUsers);


export default router;