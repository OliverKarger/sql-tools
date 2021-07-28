import { MySQL_Update } from './Update';

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

describe('MySQL Update Query erzeugen', () => {
    it(`Query: UPDATE users SET login = 'john doe' WHERE uuid = '1'`, async () => {
        const q = MySQL_Update({ table: 'users', pairs: [{ field: 'login', value: 'john doe' }], where: { field: 'uuid', comparer: '=', value: '1' } });
        const before = await db.prepare(`SELECT login FROM users WHERE uuid = '1'`).get();
        await db.prepare(q).run();
        const after = await db.prepare(`SELECT login FROM users WHERE uuid = '1'`).get();
        expect(before.login).toBe('user 1');
        expect(after.login).toBe(`john doe`);
    });
});