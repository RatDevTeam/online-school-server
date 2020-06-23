import { Router } from 'express';
import {addSubject, deleteSubject, getAllSubject} from "../controllers/subjects.controller";
import {addSubjectValidators} from "../validators/subject.validators";
import { validation } from '../utils';

const router = Router();

router.get('/', getAllSubject);

router.post('/add', addSubjectValidators, validation, addSubject);

router.delete('/delete/:id', deleteSubject);

export default router;
