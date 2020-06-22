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
exports.deleteSubject = exports.addSubject = exports.getAllSubject = void 0;
const subject_model_1 = __importDefault(require("../models/subject.model"));
exports.getAllSubject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const subject = yield subject_model_1.default.find();
        if (!subject) {
            return res.status(400).send('Ни один придмет не найден');
        }
        return res.status(200).send(subject);
    }
    catch (e) {
        return res.status(500).send('Что-то пошло не так');
    }
});
exports.addSubject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, color, type } = req.body;
        const subjects = yield subject_model_1.default.find();
        const equal = subjects.find(subject => (subject.title === title || subject.color === color || subject.type === type));
        if (equal) {
            let text = [];
            if (equal.color === color) {
                text.push('Предмет с таким цветом уже есть');
            }
            if (equal.title === title) {
                text.push('Предмет с таким именем уже есть');
            }
            if (equal.type === type) {
                text.push('Предмет с таким типом уже есть');
            }
            return res.status(400).send(text);
        }
        const subject = new subject_model_1.default(req.body);
        const newSubject = yield subject.save();
        return res.status(200).send(newSubject);
    }
    catch (e) {
        return res.status(500).send('Что-то пошло не так');
    }
});
exports.deleteSubject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const subject = yield subject_model_1.default.findOne({ _id: id });
        if (!subject) {
            return res.status(400).send('Предмет отсутствует');
        }
        yield subject_model_1.default.remove({ _id: subject._id });
        return res.status(200).send(`Предмет ${subject.title} удален`);
    }
    catch (e) {
        return res.status(500).send('Что-то пошло не так');
    }
});
