import { readFileSync } from "fs";
import { placeholders } from './interface'
import { join, parse, dirname } from "path";

const getSqlQuery = (fileName: string, subPath: string = ''): string => {
    const path = join(dirname(__dirname), "..", "sql", subPath, `${fileName}.sql`);
    const query = readFileSync(path, { encoding: "utf-8" });
    return query;
};


const formatSql = (sql: string, placeholders: placeholders): string => {
    for(let key in placeholders){
        if(placeholders[key] == null){
            placeholders[key] = ''
        }
        sql = sql.replace( `@${key}`, `'${placeholders[key]}'` )
    }
    return sql;
}

export {
    getSqlQuery,
    formatSql
}