import pgPromise from 'pg-promise'

// connection to the pgAdmin database
const db = pgPromise()('postgres://postgres:postgres@localhost:5432/db_exercise')
console.log(db);


//CRETING PLANET TABLE
const setupDb = async () => {
	await db.none(`
	DROP TABLE IF EXISTS users;
	CREATE TABLE users (
		id SERIAL NOT NULL PRIMARY KEY,
		username TEXT NOT NULL,
		password TEXT NOT NULL,
		token TEXT
	)`)

	await db.none(
		`INSERT INTO users (username, password) VALUES ('hakromah', 'hakromah')`
	);

}
setupDb()
export {db};
