interface params {
    fields: string | string[];
    table: string;
    where?: {
        field: string;
        comparer: 'LIKE' | 'NOT LIKE' | '=' | '<' | '>' | '<=' | '>=';
        value: string;
    };
    order?: {
        orderBy: string | string[];
        direction: 'ASC' | 'DESC';
    };
    limit?: {
        begin: 'TOP' | 'BOTTOM';
        range: number;
    };
}
export declare function MySQL_Select(props: params): string;
export {};
