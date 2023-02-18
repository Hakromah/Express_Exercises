import { Request, Response } from 'express';
import joi from 'joi';

type Planet = {
	id: number;
	name: string;
};

type Planets = Planet[];

let planets: Planets = [
	{
		id: 1,
		name: 'Earth',
	},
	{
		id: 2,
		name: 'Mars',
	},
	{
		id: 3,
		name: 'Mercury',
	},
];

const getAll = (req: Request, res:Response) => {
	console.log(req);
	res.status(200).json(planets);
};

const getOneById = (req: Request, res:Response) => {
	const { id } = req.params;

	let planet = planets.find((p) => p.id === Number(id));
	res.status(200).json(planet);
};

//todo validation with (joi)

const planetSchema = joi.object({
	id: joi.number().integer().required(),
	name: joi.string().required(),
});

const create = (req: Request, res:Response) => {
	const { name } = req.body;
	//let id = planets [planets.length -1] +1 //another way to generate ID
	let id = Math.floor(Math.random() * 100);
	const newValue: Planet = { id, name };

	const validateNewPlanet = planetSchema.validate(newValue);
	if (validateNewPlanet.error) {
		return res.status(400).json({ msg: validateNewPlanet.error.details[0].message });
	} else {
		planets = [...planets, newValue];
		res.status(201).json({ msg: 'Planet was created' });
	}
};



const updateById = (req: Request, res:Response) => {
	const { id } = req.params;
	const { name } = req.body;
	planets = planets.map((p) => (p.id === Number(id) ? { ...p, name } : p));
	console.log(planets);

	res.status(200).json({ msg: 'The name was updated' });
};

const deleteById = (req: Request, res:Response) => {
	const { id } = req.params;

	planets = planets.filter((p) => p.id !== Number(id));
	console.log(planets);

	res.status(200).json({ msg: 'Planet was deleted' });
};

export {getAll, getOneById, create, updateById, deleteById}


