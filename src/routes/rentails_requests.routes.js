import { Router } from "express";
const auth = require('./auth.routes');

const router = Router();

// Controllers
import { createRentalRequest, showRentalRequests, getRentalRequest, updateRentalRequest } from "../controllers/rentail_requests";

router.get('/', showRentalRequests);

router.get('/:id', getRentalRequest);

router.post('/', auth.requerido, createRentalRequest);

router.put('/:id/:answer', auth.requerido, updateRentalRequest);


export default router;