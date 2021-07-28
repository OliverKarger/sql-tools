"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MySQL_Insert = void 0;
function MySQL_Insert(props) {
    let query = `INSERT INTO ${props.table}(`;
    for (let itr = 0; itr <= props.pairs.length - 1; itr++) {
        query += props.pairs[itr].fieldName;
        if (itr !== props.pairs.length - 1) {
            query += ',';
        }
        else {
            query += ')';
        }
    }
    query += ' VALUES (';
    for (let itr = 0; itr <= props.pairs.length - 1; itr++) {
        query += `'${props.pairs[itr].fieldValue}'`;
        if (itr !== props.pairs.length - 1) {
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