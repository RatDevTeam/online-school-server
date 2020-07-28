import { Request, Response } from 'express';
import multer from "multer";
const { Storage } = require('@google-cloud/storage');

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
            return cb(new Error('Только .png, .jpg и .jpeg форматы!'));
        }
    },
});

const storage = new Storage({
    projectId: process.env.GCLOUD_PROJECT_ID,
    keyFilename: process.env.GCLOUD_APPLICATION_CREDENTIALS,
});

const bucket = storage.bucket(process.env.GCLOUD_STORAGE_BUCKET_URL);


export const uploadPhotos = async (req: Request, res: Response) => {
    try {

        if (!req.file) {
            return res.status(400).send('Отсутствует файл для загрузки');
        }

        const blob = bucket.file(req.file.originalname);

        const blobWriter = blob.createWriteStream({
            metadata: {
                contentType: req.file.mimetype,
            },
        });


        blobWriter.on('error', (err:any) => console.log(err));

        blobWriter.on('finish', () => {
            const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${
                bucket.name
            }/o/${encodeURI(blob.name)}?alt=media`;

            console.log(publicUrl)

            return res
                .status(200)
                .send({ fileName: req.file.originalname, fileLocation: publicUrl });
        });

        blobWriter.end(req.file.buffer);
    } catch (e) {
        return res.status(500).send('Что-то пошло не так');
    }
};