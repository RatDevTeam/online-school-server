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
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const courses_router_1 = __importDefault(require("./routes/courses.router"));
const subjects_router_1 = __importDefault(require("./routes/subjects.router"));
const teachers_router_1 = __importDefault(require("./routes/teachers.router"));
const app = express_1.default();
const PORT = 5000;
const URL = process.env.URL || 'mongodb+srv://Dmitriy:z8MXcHyO3kquu00N@putilov-master.hl03q.mongodb.net/OnlineSchool?retryWrites=true&w=majority';
app.use(cors_1.default());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
app.get('/', (req, res, next) => {
    res.send('hello server');
});
app.use('/api/courses', courses_router_1.default);
app.use('/api/subjects', subjects_router_1.default);
app.use('/api/teachers', teachers_router_1.default);
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: true,
        });
        app.listen(PORT, () => console.log("We are live on " + PORT));
    }
    catch (e) {
        console.log("Server error", e.message);
        process.exit(1);
    }
});
start();
