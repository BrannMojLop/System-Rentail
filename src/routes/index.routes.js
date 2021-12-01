import { Router } from "express";

const router = Router();

router.get('/', (req, res) => {
    res.send('Welcome to my new API!');
});


export default router;