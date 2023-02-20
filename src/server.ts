import * as dotenv from 'dotenv'
import express from 'express';
import 'express-async-errors';
import morgan from 'morgan';
import { logIn, logOut, signUp } from './controllers/users.js';
import authorize from "./authorize.js"
import { db } from './db.js';

dotenv.config()
const app = express();
const port = process.env.PORT;

app.use(morgan('dev'));
app.use(express.json());

app.get('/api/users', async (req, res) => {
	const users = await db.many(`SELECT * FROM users`);
	console.log(users);
	res.status(200).json(users);
});

app.post('/api/users/signup', signUp);
app.post('/api/users/login', logIn);
app.get('/api/users/logout', authorize, logOut);


app.listen(port, () => {
	console.log(`Example app listening on port http://localhost:${port}`);
});






