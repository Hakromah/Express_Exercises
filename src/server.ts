import * as dotenv from 'dotenv';
import express from 'express';
import 'express-async-errors';
import morgan from 'morgan';
import multer from 'multer';
import "./passport.js";

import {
	getAll,
	getUser,
	getPost,
	getUpdate,
	getDelete,
	createImage,
} from './controllers/planets.js';
import { logIn, signUp, logOut } from './controllers/users.js';
import authorize from './authorize.js';

// UPLOAD FILE TO DATABASE
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, './uploads');
	},
	filename: (req, file, cb) => {
		cb(null, file.originalname);
	},
});
const upload = multer({ storage });

dotenv.config();
const app = express();

const port = process.env.PORT;


//show the image in the browser
app.use('/uploads', express.static('uploads'));
app.use('/static', express.static('uploads'));

app.use(morgan('dev'));
app.use(express.json());

app.get('/api/planets', getAll);

app.get('/api/planets/:id', getUser);

app.post('/api/planets', getPost);

app.put('/api/planets/:id', getUpdate);

app.delete('/api/planets/:id', getDelete);

app.post('/api/planets/:id/image', authorize, upload.single('image'), createImage);

app.post('/api/users/login', logIn);
app.post('/api/users/signup', signUp);
app.get('/api/users/logout', authorize, logOut);

app.listen(port, () => {
	console.log(`app listening on port http://localhost:${port}`);
});
