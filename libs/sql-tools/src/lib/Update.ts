interface params {
    table: string;
    pairs: UpdatePair[];
    where?: {
        field: string;
        comparer: 'LIKE' | 'NOT LIKE' | '=' | '<' | '>' | '<=' | '>=';
        value: string;
    },

};

interface UpdatePair {
    field: string;
    value: string
};

export function MySQL_Update(props: params): string {
    let query = `UPDATE ${props.table} SET `;
    for (let itr = 0; itr <= props.pairs.length - 1; itr++) {
        query += `${props.pairs[itr].field} = '${props.pairs[itr].value}'`;
        if (itr !== props.pairs.length - 1) {
            query += ',';
        }
    }
    if (props.where !== undefined) {
        query += ` WHERE ${props.where.field} ${props.where.comparer} '${props.where.value}'`;
    }
    return query;
}