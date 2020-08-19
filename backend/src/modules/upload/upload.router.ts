import express, {Router} from 'express';
import multer from 'multer';
import uploadController from "./upload.controller";

const router = Router({});
const storage = multer.diskStorage({
    destination: function (req: express.Request, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req: express.Request, file, cb) {
        cb(null, file.fieldname);
    },
});
const upload = multer({storage: storage});

router.post('/path-db', upload.single('avatar'), uploadController.uploadData);

export default router;