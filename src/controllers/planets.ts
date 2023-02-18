import { Request, Response } from 'express';
import joi from 'joi';
import pgPromise from 'pg-promise'

// connection to the pgAdmin database
const db = pgPromise()('postgres://postgres:postgres@localhost:5432/db_exercise')
console.log(db);


//CRETING PLANET TABLE
const setupDb = async () => {
	await db.none(`
	DROP TABLE IF EXISTS planets;

	CREATE TABLE planets (
		id SERIAL NOT NULL PRIMARY KEY,
		name TEXT NOT NULL,
		image TEXT
	)`)

	await db.none(`INSERT INTO planets (name) VALUES ('Earth')`)
	await db.none(`INSERT INTO planets (name) VALUES ('Mars')`)
}
setupDb()


const getAll = async (req: Request, res: Response) => {
	const planets = await db.many(`SELECT * FROM planets`)
	res.status(200).json(planets);
};

const getOneById = async (req: Request, res: Response) => {
	const { id } = req.params;
	let planet = await db.oneOrNone(`SELECT * FROM planets WHERE id=$1`, Number(id))
	res.status(200).json(planet);
};

//todo validation with (joi)

const planetSchema = joi.object({
	id: joi.number().integer().required(),
	name: joi.string().required(),
});

// POST PLANET
const create = async (req: Request, res: Response) => {
	const { name } = req.body;
	//let id = planets [planets.length -1] +1 //another way to generate ID
	let id = Math.floor(Math.random() * 100);
	const newValue = { id, name };

	const validateNewPlanet = planetSchema.validate(newValue);
	if (validateNewPlanet.error) {
		return res
			.status(400)
			.json({ msg: validateNewPlanet.error.details[0].message });
	} else {
		await db.none(`INSERT INTO planets (name) VALUES ($1)`, name)
		res.status(201).json({ msg: 'Planet was created' });
	}
};

// UPDATE PLANET
const updateById = async (req: Request, res: Response) => {
	const { id } = req.params;
	const { name } = req.body;
	await db.none(`UPDATE planets SET name=$2 WHERE id=$1`,  [id, name])

	res.status(200).json({ msg: 'The name was updated' });
};

//DELETE PLANET
const deleteById = async (req: Request, res: Response) => {
	const { id } = req.params;

	await db.none(`DELETE FROM planets WHERE id=$1`, Number(id))

	res.status(200).json({ msg: 'Planet was deleted' });
};
// UPLOADE IMAGE FUNCTION
const createImg = async (req:Request, res:Response) => {
	console.log(req.file);
	const { id } = req.params;
	const filename = req.file?.path;

	if(filename) {
		db.none(`UPDATE planets SET image=$2 WHERE id=$1`, [id, filename])
		res.status(201).json({msg: 'Image uploaded successfully'})
	}else{
		res.status(400).json({msg: 'Image faild to upload'})
	}
}

export { getAll, getOneById, create, updateById, deleteById, createImg };
