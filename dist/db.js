var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import pgPromise from 'pg-promise';
// connection to the pgAdmin database
const db = pgPromise()('postgres://postgres:postgres@localhost:5432/db_exercise');
console.log(db);
//CRETING PLANET TABLE
const setupDb = () => __awaiter(void 0, void 0, void 0, function* () {
    yield db.none(`
	DROP TABLE IF EXISTS users;
	CREATE TABLE users (
		id SERIAL NOT NULL PRIMARY KEY,
		username TEXT NOT NULL,
		password TEXT NOT NULL,
		token TEXT
	)`);
    yield db.none(`INSERT INTO users (username, password) VALUES ('hakromah', 'hakromah')`);
});
setupDb();
export { db };