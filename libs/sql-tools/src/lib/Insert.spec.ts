import { MySQL_Insert } from './Insert';

describe('MySQL Insert Query erzeugen', () => {
    it(`Query: INSERT INTO users(login,passwd,authlevel) VALUES ('admin','1234admin1234','10')`, () => {
        const q = MySQL_Insert({
            table: 'users', pairs: [
                { fieldName: 'login', fieldValue: 'admin' },
                { fieldName: 'passwd', fieldValue: '1234admin1234' },
                { fieldName: 'authlevel', fieldValue: '10' }
            ]
        });
        expect(q).toBe(`INSERT INTO users(login,passwd,authlevel) VALUES ('admin','1234admin1234','10')`);
    });
    it(`Query: INSERT INTO counter(cid) VALUES ('1')`, () => {
        const q = MySQL_Insert({ table: 'counter', pairs: [{ fieldName: 'cid', fieldValue: '1' }] });
        expect(q).toBe(`INSERT INTO counter(cid) VALUES ('1')`);
    })
});