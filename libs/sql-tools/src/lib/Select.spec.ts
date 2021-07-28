import { MySQL_Select } from './Select';

import * as sqlite from 'better-sqlite3';

let db: sqlite.Database;
const setupQuery = `
CREATE TABLE users (
    uuid INTEGER NOT NULL UNIQUE,
    login VARCHAR(25) NOT NULL UNIQUE,
    passwd VARCHAR(64) NOT NULL,
    authlevel INTEGER,
    PRIMARY KEY (uuid)
);

INSERT INTO users (login,passwd,authlevel) VALUES ('user 1', '1234', 10);
INSERT INTO users (login,passwd,authlevel) VALUES ('user 2', '4567', 9);
INSERT INTO users (login,passwd,authlevel) VALUES ('user 3', '8910', 8);
INSERT INTO users (login,passwd,authlevel) VALUES ('user 4', '1112', 5);
INSERT INTO users (login,passwd,authlevel) VALUES ('user 5', '1314', 3);
INSERT INTO users (login,passwd,authlevel) VALUES ('user 6', '1516', 1);
`;

beforeEach(() => {
    // Setup Demo Database for Testing
    db = new sqlite(':memory:');
    // Setup Tables
    db.exec(setupQuery);
    if (!db.open) {
        throw ('Database konnte nicht geöffnet werden!');
    }
});

afterEach(() => {
    db.close();
});

describe('MySQL Select Query erzeugen', () => {
    it('Query: SELECT * FROM users', async () => {
        const q = MySQL_Select({ fields: '*', table: 'users' });
        const data = await db.prepare(q).all();
        expect(q).toBe('SELECT * FROM users');
        expect(data[0].uuid).toBe(1);
        expect(data[0].login).toBe('user 1');
        expect(data[0].passwd).toBe('1234');
        expect(data[0].authlevel).toBe(10);
        expect(data.length).toBe(6);
    });
    it('Query: SELECT uuid,login FROM users', async () => {
        const q = MySQL_Select({ fields: ['uuid', 'login'], table: 'users' });
        const data = await db.prepare(q).all();
        expect(q).toBe('SELECT uuid,login FROM users');
        expect(data[0].uuid).toBe(1);
        expect(data[1].login).toBe('user 2');
        expect(data[2].passwd).toBe(undefined);
        expect(data.length).toBe(6);
    });
    it(`Query: SELECT login,passwd FROM users WHERE uuid='1'`, async () => {
        const q = MySQL_Select({ fields: ['login', 'passwd'], table: 'users', where: { field: 'uuid', comparer: '=', value: '1' } });
        const data = await db.prepare(q).all();
        expect(q).toBe(`SELECT login,passwd FROM users WHERE uuid='1'`);
        expect(data[0].uuid).toBe(undefined);
        expect(data.length).toBe(1);
    });
    it(`Query: SELECT login,passwd,authlevel FROM users LIMIT 1`, async () => {
        const q = MySQL_Select({ fields: ['login', 'passwd', 'authlevel'], table: 'users', limit: 1 });
        const data = await db.prepare(q).all();
        expect(q).toBe(`SELECT login,passwd,authlevel FROM users LIMIT 1`);
        expect(data.length).toBe(1);
    });
    it(`Query: SELECT login,passwd,authlevel FROM users ORDER BY uuid ASC`, async () => {
        const q = MySQL_Select({ fields: ['login', 'passwd', 'authlevel'], table: 'users', order: { orderBy: 'uuid', direction: 'ASC' } });
        const data = await db.prepare(q).all();
        expect(q).toBe(`SELECT login,passwd,authlevel FROM users ORDER BY uuid ASC`);
        expect(data.length).toBe(6);
        expect(data[5].login).toBe('user 6');
    });
    it(`Query: SELECT login,passwd,authlevel FROM users ORDER BY uuid DESC`, async () => {
        const q = MySQL_Select({ fields: ['login', 'passwd', 'authlevel'], table: 'users', order: { orderBy: 'uuid', direction: 'DESC' } });
        const data = await db.prepare(q).all();
        expect(q).toBe(`SELECT login,passwd,authlevel FROM users ORDER BY uuid DESC`);
        expect(data.length).toBe(6);
        expect(data[5].login).toBe('user 1');
    });
});