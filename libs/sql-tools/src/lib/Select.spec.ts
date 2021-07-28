import { MySQL_Select } from './Select';

describe('MySQL Select Query erzeugen', () => {
    it('Query: SELECT * FROM users', () => {
        const q = MySQL_Select({ fields: '*', table: 'users' });
        expect(q).toBe('SELECT * FROM users');
    });
    it('Query: SELECT uuid,login FROM users', () => {
        const q = MySQL_Select({ fields: ['uuid', 'login'], table: 'users' });
        expect(q).toBe('SELECT uuid,login FROM users');
    });
    it(`Query: SELECT login,passwd FROM users WHERE uuid='1'`, () => {
        const q = MySQL_Select({ fields: ['login', 'passwd'], table: 'users', where: { field: 'uuid', comparer: '=', value: '1' } });
        expect(q).toBe(`SELECT login,passwd FROM users WHERE uuid='1'`)
    });
    it(`Query: SELECT login,passwd,authlevel FROM users WHERE uuid='1' LIMIT TOP 1`, () => {
        const q = MySQL_Select({ fields: ['login', 'passwd', 'authlevel'], table: 'users', where: { field: 'uuid', 'comparer': '=', value: '1' }, limit: { begin: 'TOP', 'range': 1 } });
        expect(q).toBe(`SELECT login,passwd,authlevel FROM users WHERE uuid='1' LIMIT TOP 1`);
    });
    it(`Query: SELECT login,passwd,authlevel FROM users WHERE uuid='1' ORDER BY uuid ASC`, () => {
        const q = MySQL_Select({ fields: ['login', 'passwd', 'authlevel'], table: 'users', where: { field: 'uuid', comparer: '=', value: '1' }, order: { orderBy: 'uuid', direction: 'ASC' } });
        expect(q).toBe(`SELECT login,passwd,authlevel FROM users WHERE uuid='1' ORDER BY uuid ASC`);
    });
});