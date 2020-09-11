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
import multer from "multer";

const app: Application = express();
const PORT = 5000;
const URL = process.env.URL || 'mongodb+srv://Dmitriy:z8MXcHyO3kquu00N@putilov-master.hl03q.mongodb.net/OnlineSchool?retryWrites=true&w=majority';
require('dotenv').config();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.send('hello server')
});

app.use('/api/courses', Course);
app.use('/api/subjects', Subject);
app.use('/api/teachers', Teacher);
app.use('/api/upload', Upload);
app.use('/api/users', User);
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


