import express, {Application, NextFunction, Request, Response} from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import Course from './routes/courses.router';
import Subject from './routes/subjects.router';
import Teacher from './routes/teachers.router';
import Upload from './routes/upload.router';
import User from './routes/users.router';
import Activate from './routes/activete.router';
import Auth from  './routes/auth.router';
import multer from "multer";
import cookieParser from 'cookie-parser';

const app: Application = express();
const PORT = 5000;
const URL = process.env.URL || 'mongodb+srv://Dmitriy:z8MXcHyO3kquu00N@putilov-master.hl03q.mongodb.net/OnlineSchool?retryWrites=true&w=majority';
require('dotenv').config();

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header("Access-Control-Allow-Origin", "http://localhost:8080"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.options('*', cors(
    {
        origin: 'http://localhost:8080',
        optionsSuccessStatus: 200,
        methods: "GET,HEAD,POST,PATCH,DELETE,OPTIONS",
        credentials: true,
        allowedHeaders: "Content-Type, Authorization, X-Requested-With, Access-Control-Allow-Origin",
    }
));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.send('hello server')
});

app.use('/api/courses', Course);
app.use('/api/subjects', Subject);
app.use('/api/teachers', Teacher);
app.use('/api/upload', Upload);
app.use('/api/users', User);
app.use('/api/auth', Auth)
app.use('/activate', Activate);
app.use(() => (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof multer.MulterError) {
        return res.status(418).send(err.code);
    }
    return res.status(500).send('Наташа все упало')
});

const start = async () => {

    try {
        await mongoose.connect(
            URL,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true,
                useFindAndModify: true,
            }
        );
        app.listen(PORT, () => console.log("We are live on " + PORT));
    } catch (e) {
        console.log("Server error", e.message);
        process.exit(1);
    }
};
start();


