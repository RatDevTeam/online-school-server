import { Router } from 'express';
import { validation } from '../utils';
import {addSubject, deleteSubject, getAllSubject} from "../controllers/subjects.controller";
import {addSubjectValidators} from "../validators/subject.validators";

const router = Router();

router.get('/', getAllSubject);

router.post('/add', addSubjectValidators, validation, addSubject);

router.delete('/delete/:id', deleteSubject);

export default router;
