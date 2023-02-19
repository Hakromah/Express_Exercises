var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as dotenv from 'dotenv';
import express from 'express';
import 'express-async-errors';
import morgan from 'morgan';
import { logIn, signUp } from './controllers/users.js';
import { db } from './db.js';
dotenv.config();
const app = express();
const port = process.env.PORT;
app.use(morgan('dev'));
app.use(express.json());
app.get('/api/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield db.many(`SELECT * FROM users`);
    console.log(users);
    res.status(200).json(users);
}));
app.post('/api/users/signup', signUp);
app.post('/api/users/login', logIn);
app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`);
});
