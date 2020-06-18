import express, {Application, NextFunction, Request, Response} from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import Course from '../src/routes/courses.router';

const app: Application = express();
const PORT = process.env.PORT || 5000;
const URL = process.env.URL || 'mongodb+srv://Dmitriy:z8MXcHyO3kquu00N@putilov-master.hl03q.mongodb.net/OnlineSchool';

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.send('hello server')
});
app.use('/api/courses', Course);


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

