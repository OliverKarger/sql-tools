export declare type InsertValuePair = {
    fieldName: string;
    fieldValue: string;
};
export declare type params = {
    table: string;
    pairs: InsertValuePair[];
};
export declare function MySQL_Insert(props: params): string;
