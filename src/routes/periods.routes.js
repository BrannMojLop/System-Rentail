import { Router } from "express";
const auth = require('./auth.routes');

const router = Router();

// Controllers
import { createPeriod, showPeriods, getPeriod, disablePeriod, updatePeriod, disablePeriods } from "../controllers/periods";

router.get('/', showPeriods);

router.get('/:id', getPeriod);

router.post('/', auth.requerido, createPeriod);

router.put('/:id', auth.requerido, updatePeriod);

router.delete('/:id', auth.requerido, disablePeriod);

router.delete('/', auth.requerido, disablePeriods);


export default router;