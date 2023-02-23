import { Request, Response } from 'express';
import Joi from 'Joi';
import { db } from '../db.js';

const getAll = async (req: Request, res: Response) => {
	const planets = await db.many(`SELECT * FROM planets`);
	console.log(planets);
	res.status(200).json(planets);
};

//!GET USER
const getUser = async (req: Request, res: Response) => {
	const { id } = req.params;
	const planet = await db.oneOrNone(
		`SELECT * FROM planets WHERE id=$1`,
		Number(id)
	);
	res.status(200).json(planet);
};

//todo  VALIDATION
const planetSchema = Joi.object({
	// id: Joi.number().integer().required(),
	name: Joi.string().required(),
});

//! POST PLANET
const getPost = async (req: Request, res: Response) => {
	const { name } = req.body;
	// const id = Math.floor(Math.random() * 1000);
	const newPlanet = { name };
	const validateNewPlanet = planetSchema.validate(newPlanet);
	if (validateNewPlanet.error) {
		return res
			.status(400)
			.json({ msg: validateNewPlanet.error.details[0].message });
	} else {
		await db.none(`INSERT INTO planets (name) VALUES ($1)`, name);
		res.status(201).json({ msg: 'Planet was greated.' });
	}
};

//!UPDATE PLANET
const getUpdate = async (req: Request, res: Response) => {
	const { id } = req.params;
	const { name } = req.body;

	await db.none(`UPDATE planets SET name=$2 WHERE id=$1`, [id, name]);
	res.status(200).json('The name is updated');
};

//!DELETE PLANET
const getDelete = async (req: Request, res: Response) => {
	const { id } = req.params;
	await db.none(`DELETE FROM planets WHERE id=$1`, Number(id));
	res.status(200).json({ msh: 'The planet was deleted' });
};

// Upload Image
const createImage = async (req: Request, res: Response) => {
	console.log(req.file);
	const { id } = req.params;
	const filename = req.file?.path;

	if (filename) {
		db.none(`UPDATE planets SET image=$2 WHERE id=$1`, [id, filename]);
		res.status(200).json({ msg: 'Planet image uploaded successfully' });
	} else {
		res.status(400).json({ msg: 'Planet image failed to upload' });
	}

	res.status(200).json({ msg: 'Planet image uploaded successfully.' });
};

export { getAll, getUser, getPost, getUpdate, getDelete, createImage };

