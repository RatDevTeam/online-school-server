import { Router } from 'express';
import { validation } from '../utils';
import {
    addTeacher,
    deleteTeacher,
    getAllTeachers,
    getTeachersByIds,
    updateTeacher
} from "../controllers/teachers.controller";
import {addTeacherValidators} from "../validators/teacher.validators";

const router = Router();

router.get('/', getAllTeachers );

router.get('/ids', getTeachersByIds);

router.post('/add', addTeacherValidators, validation, addTeacher);

router.post('/update', updateTeacher);

router.delete('/delete', deleteTeacher);


export default router;
