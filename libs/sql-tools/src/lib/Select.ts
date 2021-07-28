interface params {
    fields: string | string[];
    table: string;
    where?: {
        field: string;
        comparer: 'LIKE' | 'NOT LIKE' | '=' | '<' | '>' | '<=' | '>=';
        value: string;
    },
    order?: {
        orderBy: string | string[];
        direction: 'ASC' | 'DESC';
    }
    limit?: {
        begin: 'TOP' | 'BOTTOM';
        range: number;
    }
};

export function MySQL_Select(props: params): string {
    // Select
    let query = 'SELECT ';
    // Felder
    if (typeof props.fields === 'string') {
        query += props.fields;
    } else {
        for (let itr = 0; itr <= props.fields.length - 1; itr++) {
            query += props.fields[itr];
            if (itr !== props.fields.length - 1) {
                query += ',';
            }
        }
    }
    // Tabelle
    query += ' FROM ' + props.table;
    // Where
    if (props.where !== undefined) {
        query += ` WHERE ${props.where.field}${props.where.comparer}'${props.where.value}'`;
    }
    if (props.order !== undefined) {
        // Sort
        query += ' ORDER BY ';
        if (typeof props.order.orderBy === 'string') {
            query += props.order.orderBy;
        } else {
            for (let itr = 0; itr <= props.order.orderBy.length - 1; itr++) {
                query += props.order.orderBy[itr];
                if (itr !== props.order.orderBy.length - 1) {
                    query += ',';
                }
            }
        }
        query += ' ' + props.order.direction;
    }
    // Limit
    if (props.limit !== undefined) {
        query += ` LIMIT ${props.limit.begin} ${props.limit.range}`;
    }
    return query;
}