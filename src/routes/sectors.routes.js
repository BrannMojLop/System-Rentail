import { Router } from "express";
const auth = require('./auth.routes');

const router = Router();

// Controllers
import { createSector, showSectors, getSector, updateSector, disableSector, disableSectors } from "../controllers/sectors";

router.get('/', showSectors);

router.get('/:id', getSector);

router.post('/', auth.requerido, createSector);

router.put('/:id', auth.requerido, updateSector);

router.delete('/:id', auth.requerido, disableSector);

router.delete('/', auth.requerido, disableSectors);


export default router;