import { Router } from 'express';
import {uploadMulter, uploadPhotos} from "../controllers/upload.constroller";
const router = Router();


router.post('/photo', uploadMulter.single('image'), uploadPhotos);

export default router;
