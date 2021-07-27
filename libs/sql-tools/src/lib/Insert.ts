export type InsertValuePair = {
    fieldName: string;
    fieldValue: string;
}

export function MySQL_Insert(
    table: string,
    pairs: InsertValuePair[],
) {
    let query = `INSERT INTO ${table}(`;
    for (let itr = 0; itr <= pairs.length - 1; itr++) {
        query += pairs[itr].fieldName;
        if (itr !== pairs.length - 1) {
            query += ',';
        } else {
            query += ')';
        }
    }
    query += ' VALUES (';
    for (let itr = 0; itr <= pairs.length - 1; itr++) {
        query += `'${pairs[itr].fieldValue}'`;
        if (itr !== pairs.length - 1) {
            query += ',';
        } else {
            query += ')';
        }
    }
    return query;
}