import { MySQL_GenSelectQuery, MySQL_GenInsertQuery } from './SqlTools';

describe('MySQL Select Query erzeugen', () => {
    it('Query: SELECT * FROM users', () => {
        const q = MySQL_GenSelectQuery('*', 'users');
        expect(q).toBe('SELECT * FROM users');
    });
    it('Query: SELECT uuid,login FROM users', () => {
        const q = MySQL_GenSelectQuery(['uuid', 'login'], 'users');
        expect(q).toBe('SELECT uuid,login FROM users');
    });
    it(`Query: SELECT login,passwd FROM users WHERE uuid='1'`, () => {
        const q = MySQL_GenSelectQuery(['login', 'passwd'], 'users', { field: 'uuid', comparer: '=', value: '1' });
        expect(q).toBe(`SELECT login,passwd FROM users WHERE uuid='1'`)
    });
    it(`Query: SELECT login,passwd,authlevel FROM users WHERE uuid='1' LIMIT TOP 1`, () => {
        const q = MySQL_GenSelectQuery(['login', 'passwd', 'authlevel'], 'users', { field: 'uuid', 'comparer': '=', value: '1' }, { begin: 'TOP', 'range': 1 });
        expect(q).toBe(`SELECT login,passwd,authlevel FROM users WHERE uuid='1' LIMIT TOP 1`);
    });
});

describe('MySQL Insert Query erzeugen', () => {
    it(`Query: INSERT INTO users(login,passwd,authlevel) VALUES ('admin','1234admin1234','10')`, () => {
        const q = MySQL_GenInsertQuery('users', [
            { fieldName: 'login', fieldValue: 'admin' },
            { fieldName: 'passwd', fieldValue: '1234admin1234' },
            { fieldName: 'authlevel', fieldValue: '10' }
        ]);
        expect(q).toBe(`INSERT INTO users(login,passwd,authlevel) VALUES ('admin','1234admin1234','10')`);
    });
    it(`Query: INSERT INTO counter(cid) VALUES ('1')`, () => {
        const q = MySQL_GenInsertQuery('counter', [{ fieldName: 'cid', fieldValue: '1' }]);
        expect(q).toBe(`INSERT INTO counter(cid) VALUES ('1')`);
    })
});