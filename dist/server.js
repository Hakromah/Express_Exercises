import express from 'express';
import "express-async-errors";
import morgan from "morgan";
import { getAll, getUser, getPost, getUpdate, getDelete } from "./controllers/planets.js";
const app = express();
const port = 5000;
app.use(morgan("dev"));
app.use(express.json());
app.get("/api/planets", getAll);
app.get("/api/planets/:id", getUser);
app.post("/api/planets", getPost);
app.put("/api/planets/:id", getUpdate);
app.delete("/api/planets/:id", getDelete);
app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`);
});
