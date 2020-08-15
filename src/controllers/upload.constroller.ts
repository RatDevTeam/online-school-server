import { Request, Response, NextFunction } from 'express';
import multer from "multer";
const { Storage } = require('@google-cloud/storage');
require('dotenv').config();

export const uploadMulter = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
    fileFilter: (req, file, cb) => {
        if (
            file.mimetype == 'image/png' ||
            file.mimetype == 'image/jpg' ||
            file.mimetype == 'image/jpeg'
        ) {
            cb(null, true);
        } else {
            cb(null, false);
        }
    },
});

const storage = new Storage({
    projectId: process.env.GCLOUD_PROJECT_ID && process.env.GCLOUD_PROJECT_ID,
    keyFilename: process.env.GCLOUD_APPLICATION_CREDENTIALS && process.env.GCLOUD_APPLICATION_CREDENTIALS,
});

const bucket = process.env.GCLOUD_STORAGE_BUCKET_URL && storage.bucket(process.env.GCLOUD_STORAGE_BUCKET_URL);

export const uploadPhotos = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.file) {
            return res.status(400).send('Отсутствует файл для загрузки');
        }

        const blob = bucket.file(encodeURI(req.file.originalname));

        const blobWriter = blob.createWriteStream({
            metadata: {
                contentType: req.file.mimetype,
            },
        });

        blobWriter.on('error', (err:any) => console.log(err));

        blobWriter.on('finish', () => {
            const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${
                bucket.name
            }/o/${encodeURI(req.file.originalname)}?alt=media`;

            // return next(publicUrl);
            return res.status(202).send(publicUrl);
        });

        bucket.getFilesStream();


        blobWriter.end(req.file.buffer);
    } catch (e) {
        return res.status(500).send('Что-то пошло не так');
    }
};

export const deletePhoto = async (req: Request, res: Response) => {
    try {
        const { publicUrl } = req.body;

        //получаем имя файла из publicUrl;
        const filename = publicUrl.split('/').pop(-1).split('?alt=media')[0];
        const file = await bucket.file(filename);
        file.delete();
        return res.status(204).send(`Мы удалили ${filename}`);
    } catch (e) {
       if (e.code === 404)
           return res.status(404).send('Этот файл уже удален');
       else
        return res.status(e.code).send(e);
    }
};
