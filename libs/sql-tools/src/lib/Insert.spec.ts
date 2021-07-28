import { MySQL_Insert } from './Insert';

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

CREATE TABLE counter (
    cid INTEGER NOT NULL UNIQUE,
    PRIMARY KEY (cid)
);
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

describe('MySQL Insert Query erzeugen', () => {
    it(`Query: INSERT INTO users(login,passwd,authlevel) VALUES ('admin','1234admin1234','10')`, async () => {
        const q = MySQL_Insert({
            table: 'users', pairs: [
                { fieldName: 'login', fieldValue: 'admin' },
                { fieldName: 'passwd', fieldValue: '1234admin1234' },
                { fieldName: 'authlevel', fieldValue: '10' }
            ]
        });
        await db.prepare(q).run();
        const newUser = await db.prepare(`SELECT * FROM users WHERE login = 'admin'`).get();
        expect(q).toBe(`INSERT INTO users(login,passwd,authlevel) VALUES ('admin','1234admin1234','10')`);
        expect(newUser.uuid).toBe(7);
        expect(newUser.login).toBe('admin');
        expect(newUser.passwd).toBe('1234admin1234');
        expect(newUser.authlevel).toBe(10);
    });
    it(`Query: INSERT INTO counter(cid) VALUES ('1')`, async () => {
        const q = MySQL_Insert({ table: 'counter', pairs: [{ fieldName: 'cid', fieldValue: '1' }] });
        db.prepare(q).run();
        const table = await db.prepare(`SELECT * FROM counter`).all();
        expect(q).toBe(`INSERT INTO counter(cid) VALUES ('1')`);
        expect(table.length).toBe(1);
        expect(table[0].cid).toBe(1);
    })
});