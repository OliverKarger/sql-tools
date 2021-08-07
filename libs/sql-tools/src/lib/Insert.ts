interface InsertPair {
    fieldName: string;
    fieldValue: any;
}

interface params {
    table: string;
    pairs: InsertPair[];
};

export function MySQL_Insert(props: params) {
    let query = `INSERT INTO ${props.table}(`;
    for (let itr = 0; itr <= props.pairs.length - 1; itr++) {
        query += props.pairs[itr].fieldName;
        if (itr !== props.pairs.length - 1) {
            query += ',';
        } else {
            query += ')';
        }
    }
    query += ' VALUES (';
    for (let itr = 0; itr <= props.pairs.length - 1; itr++) {
        query += `'${props.pairs[itr].fieldValue}'`;
        if (itr !== props.pairs.length - 1) {
            query += ',';
        } else {
            query += ')';
        }
    }
    return query;
}