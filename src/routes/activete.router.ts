import { Router } from 'express';
const router = Router();
import { userActivate } from "../controllers/activate.controller";

router.get('/:id', userActivate);

export default router;
