import * as dotenv from 'dotenv';
import express from 'express';
import "express-async-errors";
import morgan from "morgan";
dotenv.config();
const app = express();
const port = process.env.PORT;
app.use(morgan("dev"));
app.use(express.json());
let planets = [
    {
        id: 1,
        name: "Earth",
    },
    {
        id: 2,
        name: "Mars",
    },
];
app.get('/', (req, res) => {
    console.log(req);
    res.status(200).json(planets);
});
app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`);
});
