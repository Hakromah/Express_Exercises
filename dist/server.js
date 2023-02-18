import * as dotenv from 'dotenv';
import express from 'express';
import 'express-async-errors';
import morgan from 'morgan';
import { create, deleteById, getAll, getOneById, updateById, createImg, } from './controllers/planets.js';
import multer from 'multer';
//SETUP MULTER FOR UPLOAD
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './assets');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});
const upload = multer({ storage });
dotenv.config();
const app = express();
const port = process.env.PORT;
app.use(morgan('dev'));
app.use(express.json());
app.get('/api/planets', getAll);
app.get('/api/planets/:id', getOneById);
app.post('/api/planets', create);
app.put('/api/planets/:id', updateById);
app.delete('/api/planets/:id', deleteById);
// UPLOAD IMAGE
app.post('/api/planets/:id/image', upload.single('image'), createImg);
app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`);
});
