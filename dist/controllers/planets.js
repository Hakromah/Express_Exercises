import Joi from "Joi";
let planets = [
    { id: 1, name: 'Earth' },
    { id: 2, name: 'Mars' },
    { id: 3, name: 'Moon' },
];
// app.get('/api/planets', (req:Request, res) => {
//   res.status(200).json(planets)
// });
// app.get("/api/planets/:id", (req:Request, res) =>{
//    const {id} = req:Request.params;
//    const planet = planets.find(p => p.id === Number(id))
//    res.status(200).json(planet)
// });
const getAll = (req, res) => {
    res.status(200).json(planets);
};
//!GET USER
const getUser = (req, res) => {
    const { id } = req.params;
    let planet = planets.find((p) => p.id === Number(id));
    res.status(200).json(planet);
};
//todo  VALIDATION
const planetSchema = Joi.object({
    id: Joi.number().integer().required(),
    name: Joi.string().required()
});
//! POST PLANET
const getPost = (req, res) => {
    // const {id, name} = req:Request.body;
    const { name } = req.body; //? create id automatically
    // let id = planets[planets.length-1].id +1
    const id = Math.floor(Math.random() * 100);
    const newPlanet = { id, name };
    const validateNewPlanet = planetSchema.validate(newPlanet); //! validation
    if (validateNewPlanet.error) {
        return res.status(400).json({ msg: validateNewPlanet.error });
    }
    else {
        planets = [...planets, newPlanet];
        res.status(201).json({ msg: 'Planet was greated.' });
    }
    // planets = [...planets, newPlanet];
    // res.status(201).json({ msg: 'Tplanet was greated.' })
};
//!UPDATE PLANET
const getUpdate = (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    planets = planets.map((p) => (p.id === Number(id) ? Object.assign(Object.assign({}, p), { name }) : p));
    console.log(planets);
    res.status(200).json('The name is updated');
};
//!DELETE PLANET
const getDelete = (req, res) => {
    const { id } = req.params;
    planets = planets.filter((p) => p.id !== Number(id));
    res.status(200).json({ msh: 'The planet was deleted' });
};
export { getAll, getUser, getPost, getUpdate, getDelete };
