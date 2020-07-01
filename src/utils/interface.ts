export interface placeholders{
    [key: string]: number | string | null;
}

export interface records<T>{
    recordsets: Array<Array<T>>;
    recordset: T[];
    output: object,
    rowsAffected: number[]
}
