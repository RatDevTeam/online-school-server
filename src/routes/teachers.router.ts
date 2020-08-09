import { Router } from 'express';
import { validation } from '../utils';
import {addTeacher, deleteTeacher, getAllTeachers, getTeachersByIds} from "../controllers/teachers.controller";
import {addTeacherValidators} from "../validators/teacher.validators";

const router = Router();

router.get('/', getAllTeachers );

router.get('/ids', getTeachersByIds);

router.post('/add', addTeacherValidators, validation, addTeacher);

router.delete('delete', deleteTeacher);


export default router;
