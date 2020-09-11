import { resetPassword } from "./users.constroller";
import { Request, Response, NextFunction } from "express";
import multer from "multer";
import { v4 } from "uuid";
const { Storage } = require("@google-cloud/storage");
require("dotenv").config();

export const uploadMulter = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {

    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {

      cb(null, false);
    }
  },
});

const storage = new Storage({
  projectId: process.env.GCLOUD_PROJECT_ID && process.env.GCLOUD_PROJECT_ID,
  keyFilename:
    process.env.GCLOUD_APPLICATION_CREDENTIALS &&
    process.env.GCLOUD_APPLICATION_CREDENTIALS,
});

const bucket =
  process.env.GCLOUD_STORAGE_BUCKET_URL &&
  storage.bucket(process.env.GCLOUD_STORAGE_BUCKET_URL);

export const uploadPhotos = async (
    err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (err instanceof multer.MulterError) {
      return res.status(500).send(err.code);
    }
    if (!req.file) {
      return next();
    }

    const imgName = v4();
    const blob = bucket.file(imgName);

    const blobWriter = blob.createWriteStream({
      metadata: {
        contentType: req.file.mimetype,
      },
    });

    blobWriter.on("error", (err: any) => console.log(err));

    blobWriter.on("finish", () => {
      const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${imgName}?alt=media`;

      console.log(publicUrl);
      res.locals.publicUrl = publicUrl;
      next();
    });

    bucket.getFilesStream();

    blobWriter.end(req.file.buffer);
  } catch (e) {
    return res.status(500).send("Что-то пошло не так");
  }
};

export const deletePhoto = async (req: Request, res: Response) => {
  try {
    const { publicUrl } = req.body;

    //получаем имя файла из publicUrl;
    const filename = publicUrl.split("/").pop(-1).split("?alt=media")[0];
    const file = await bucket.file(filename);
    file.delete();
    return res.status(204).send(`Мы удалили ${filename}`);
  } catch (e) {
    if (e.code === 404) return res.status(404).send("Этот файл уже удален");
    else return res.status(e.code).send(e);
  }
};
