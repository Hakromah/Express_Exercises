import pgPromise from 'pg-promise';
const db = pgPromise()(
	'postgres://postgres:postgres@localhost:5432/all_planets'
);

const setupDb = async () => {
	await db.none(`
      DROP TABLE IF EXISTS planets;
         CREATE TABLE planets (
            id SERIAL NOT NULL PRIMARY KEY,
            name TEXT NOT NULL,
            image TEXT
         );

      DROP TABLE IF EXISTS users;
      CREATE TABLE users (
         id SERIAL NOT NULL PRIMARY KEY,
         username TEXT NOT NULL,
         password TEXT NOT NULL,
         token TEXT
      )
   `);

	await db.none(`INSERT INTO planets (name) VALUES ('Earth')`);
	await db.none(`INSERT INTO planets (name) VALUES ('Mars')`);
	await db.none(`INSERT INTO planets (name) VALUES ('Pluto')`);
	await db.none(`INSERT INTO planets (name) VALUES ('Mercury')`);
	await db.none(`INSERT INTO planets (name) VALUES ('Jupiter')`);
	await db.none(`INSERT INTO planets (name) VALUES ('Saturn')`);
	await db.none(`INSERT INTO planets (name) VALUES ('Uranus')`);
	await db.none(`INSERT INTO planets (name) VALUES ('Neptune')`);
	await db.none(`INSERT INTO planets (name) VALUES ('Moon')`);

	await db.none(
		`INSERT INTO users (username, password) VALUES ('final', 'final')`
	);
};
setupDb();
export { db };
