"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MySQL_Select = void 0;
function MySQL_Select(fields, table, where, limit) {
    // Select
    let query = 'SELECT ';
    // Felder
    if (typeof fields === 'string') {
        query += fields;
    }
    else {
        for (let itr = 0; itr <= fields.length - 1; itr++) {
            query += fields[itr];
            if (itr !== fields.length - 1) {
                query += ',';
            }
        }
    }
    // Tabelle
    query += ' FROM ' + table;
    // Where
    if (where !== undefined) {
        query += ` WHERE ${where.field}${where.comparer}'${where.value}'`;
    }
    // Limit
    if (limit !== undefined) {
        query += ` LIMIT ${limit.begin} ${limit.range}`;
    }
    return query;
}
exports.MySQL_Select = MySQL_Select;
//# sourceMappingURL=Select.js.map