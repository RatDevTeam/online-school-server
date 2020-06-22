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
exports.deleteCourse = exports.updateCourse = exports.addCourse = exports.getAllCourses = void 0;
const courses_model_1 = __importDefault(require("../models/courses.model"));
exports.getAllCourses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const courses = yield courses_model_1.default.find();
        return res.status(200).send(courses);
    }
    catch (e) {
        return res.status(500).send('Что-то пошло не так');
    }
});
exports.addCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description, dateStart, dateFinish } = req.body;
        const dateS = new Date(dateStart);
        const dateF = new Date(dateFinish);
        const course = new courses_model_1.default({
            title,
            description,
            dateStart: dateS,
            dateFinish: dateF,
        });
        const newCourse = yield course.save();
        return res.status(200).send(newCourse);
    }
    catch (e) {
        return res.status(500).send('Что-то пошло не так');
    }
});
exports.updateCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const payload = req.query;
        const course = yield courses_model_1.default.findOne({ _id: id });
        if (!course) {
            return res.status(400).send('Курс не найден');
        }
        const newCourse = yield courses_model_1.default.findOneAndUpdate({ _id: id }, payload, { new: true });
        return res.status(200).send(newCourse);
    }
    catch (e) {
        return res.status(500).send('Что-то пошло не так');
    }
});
exports.deleteCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const course = yield courses_model_1.default.findOne({ _id: id });
        if (!course) {
            return res.status(400).send('Курс не найден');
        }
        yield courses_model_1.default.remove({ _id: course._id });
        return res.status(200).send(`Курс ${course.title} удален`);
    }
    catch (e) {
        return res.status(500).send('Что-то пошло не так');
    }
});
