"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MySQL_Insert = void 0;
function MySQL_Insert(table, pairs) {
    let query = `INSERT INTO ${table}(`;
    for (let itr = 0; itr <= pairs.length - 1; itr++) {
        query += pairs[itr].fieldName;
        if (itr !== pairs.length - 1) {
            query += ',';
        }
        else {
            query += ')';
        }
    }
    query += ' VALUES (';
    for (let itr = 0; itr <= pairs.length - 1; itr++) {
        query += `'${pairs[itr].fieldValue}'`;
        if (itr !== pairs.length - 1) {
            query += ',';
        }
        else {
            query += ')';
        }
    }
    return query;
}
exports.MySQL_Insert = MySQL_Insert;
//# sourceMappingURL=Insert.js.map