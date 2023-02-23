var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Joi from 'Joi';
import { db } from '../db.js';
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const planets = yield db.many(`SELECT * FROM planets`);
    console.log(planets);
    res.status(200).json(planets);
});
//!GET USER
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const planet = yield db.oneOrNone(`SELECT * FROM planets WHERE id=$1`, Number(id));
    res.status(200).json(planet);
});
//todo  VALIDATION
const planetSchema = Joi.object({
    // id: Joi.number().integer().required(),
    name: Joi.string().required(),
});
//! POST PLANET
const getPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    // const id = Math.floor(Math.random() * 1000);
    const newPlanet = { name };
    const validateNewPlanet = planetSchema.validate(newPlanet);
    if (validateNewPlanet.error) {
        return res
            .status(400)
            .json({ msg: validateNewPlanet.error.details[0].message });
    }
    else {
        yield db.none(`INSERT INTO planets (name) VALUES ($1)`, name);
        res.status(201).json({ msg: 'Planet was greated.' });
    }
});
//!UPDATE PLANET
const getUpdate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name } = req.body;
    yield db.none(`UPDATE planets SET name=$2 WHERE id=$1`, [id, name]);
    res.status(200).json('The name is updated');
});
//!DELETE PLANET
const getDelete = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield db.none(`DELETE FROM planets WHERE id=$1`, Number(id));
    res.status(200).json({ msh: 'The planet was deleted' });
});
// Upload Image
const createImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    console.log(req.file);
    const { id } = req.params;
    const filename = (_a = req.file) === null || _a === void 0 ? void 0 : _a.path;
    if (filename) {
        db.none(`UPDATE planets SET image=$2 WHERE id=$1`, [id, filename]);
        res.status(200).json({ msg: 'Planet image uploaded successfully' });
    }
    else {
        res.status(400).json({ msg: 'Planet image failed to upload' });
    }
    res.status(200).json({ msg: 'Planet image uploaded successfully.' });
});
export { getAll, getUser, getPost, getUpdate, getDelete, createImage };
