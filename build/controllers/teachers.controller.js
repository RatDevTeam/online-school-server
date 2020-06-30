"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTeacher = exports.addTeacher = exports.getTeachersByIds = exports.getAllTeachers = void 0;
const teachers_model_1 = __importDefault(require("../models/teachers.model"));
exports.getAllTeachers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const teacher = yield teachers_model_1.default.find();
        if (!teacher) {
            return res.status(400).send('Ни один преподователь не найден');
        }
        return res.status(200).send(teacher);
    }
    catch (e) {
        return res.status(500).send('Что-то пошло не так');
    }
});
exports.getTeachersByIds = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const idsString = req.header('ids');
        let ids;
        if (idsString) {
            ids = idsString.split(',');
        }
        else {
            return res.status(400).send('Нет списка преподователей');
        }
        console.log(ids);
        const teachers = yield teachers_model_1.default.find();
        if (!teachers) {
            return res.status(400).send('Ни один преподователь не найден');
        }
        const teachersForCourse = teachers.filter((teacher) => ids.includes(String(teacher._id)));
        res.status(200).send(teachersForCourse);
    }
    catch (e) {
        return res.status(500).send('Что-то пошло не так');
    }
});
exports.addTeacher = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description, vkUrl } = req.body;
        const teacher = new teachers_model_1.default({
            name, description, vkUrl
        });
        const newTeacher = yield teacher.save();
        return res.status(200).send(newTeacher);
    }
    catch (e) {
        return res.status(500).send('Что-то пошло не так');
    }
});
exports.deleteTeacher = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const teacher = yield teachers_model_1.default.findOne({ _id: id });
        if (!teacher) {
            return res.status(400).send('Такого преподователя нет');
        }
        yield teachers_model_1.default.remove({ _id: teacher._id });
        return res.status(200).send(`Преподователь ${teacher.name} удален`);
    }
    catch (e) {
        return res.status(500).send('Что-то пошло не так');
    }
});
