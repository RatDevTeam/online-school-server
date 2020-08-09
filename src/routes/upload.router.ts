import { Router } from 'express';
import {deletePhoto, uploadMulter, uploadPhotos} from "../controllers/upload.constroller";

const router = Router();

router.post('/photo', uploadMulter.single('image'), uploadPhotos);

router.delete('/photo', deletePhoto);

export default router;
