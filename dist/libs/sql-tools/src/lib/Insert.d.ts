export declare type InsertValuePair = {
    fieldName: string;
    fieldValue: string;
};
export declare function MySQL_Insert(table: string, pairs: InsertValuePair[]): string;
