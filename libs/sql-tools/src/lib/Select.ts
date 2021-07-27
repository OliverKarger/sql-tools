export function MySQL_GenSelectQuery(
    fields: string | string[],
    table: string,
    where?: {
        field: string,
        comparer: 'LIKE' | 'NOT LIKE' | '=',
        value: string,
    },
    limit?: {
        begin: 'TOP' | 'BOTTOM',
        range: number
    }
): string {
    // Select
    let query = 'SELECT ';
    // Felder
    if (typeof fields === 'string') {
        query += fields;
    } else {
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