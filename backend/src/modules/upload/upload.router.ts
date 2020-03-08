import router from 'router';
import multer from 'multer';
import uploadController from "./upload.controller";

const upload = multer({dest: '/uploads'});

router.post('/path-db', upload.single('avatar'), uploadController.uploadData);
export 