import { MySQL_Select } from './Select';

describe('MySQL Select Query erzeugen', () => {
    it('Query: SELECT * FROM users', () => {
        const q = MySQL_Select('*', 'users');
        expect(q).toBe('SELECT * FROM users');
    });
    it('Query: SELECT uuid,login FROM users', () => {
        const q = MySQL_Select(['uuid', 'login'], 'users');
        expect(q).toBe('SELECT uuid,login FROM users');
    });
    it(`Query: SELECT login,passwd FROM users WHERE uuid='1'`, () => {
        const q = MySQL_Select(['login', 'passwd'], 'users', { field: 'uuid', comparer: '=', value: '1' });
        expect(q).toBe(`SELECT login,passwd FROM users WHERE uuid='1'`)
    });
    it(`Query: SELECT login,passwd,authlevel FROM users WHERE uuid='1' LIMIT TOP 1`, () => {
        const q = MySQL_Select(['login', 'passwd', 'authlevel'], 'users', { field: 'uuid', 'comparer': '=', value: '1' }, { begin: 'TOP', 'range': 1 });
        expect(q).toBe(`SELECT login,passwd,authlevel FROM users WHERE uuid='1' LIMIT TOP 1`);
    });
});