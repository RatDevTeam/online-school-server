import { Router } from 'express';
import {deletePhoto, uploadMulter, uploadPhotos} from "../controllers/upload.constroller";

const router = Router();

router.post('/', uploadMulter.single('image'), uploadPhotos);

router.delete('/', deletePhoto);

export default router;
