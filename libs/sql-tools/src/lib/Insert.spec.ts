import { MySQL_GenInsertQuery } from './Insert';

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