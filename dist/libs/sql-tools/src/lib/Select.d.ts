export declare function MySQL_Select(fields: string | string[], table: string, where?: {
    field: string;
    comparer: 'LIKE' | 'NOT LIKE' | '=';
    value: string;
}, limit?: {
    begin: 'TOP' | 'BOTTOM';
    range: number;
}): string;
