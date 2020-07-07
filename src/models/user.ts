import { getSqlQuery, formatSql } from "../utils";
import { records, placeholders } from "../utils/interface";

import { Request, ConnectionPool } from "mssql";
import { getConnection } from "../database/connection";

export interface dUser{
  UserName: string,
  UserPass: string,
  Email: string,
}

const findUserByEmail = async (Email: string) => {
    let sql = await getSqlQuery("find_user_by_email", "Authentication");
    sql = formatSql(sql, { Email });
    console.log(Email)
    console.log(sql)
    const pool: ConnectionPool | null = await getConnection();
    if(pool){
      const request: Request = await pool.request();
      try{
        let records: records<dUser> = await request.query(sql);
        return records.recordset;
      }
      catch(err){
        console.log('Cant retrieve data')
        return null;
      }
    }
    else{
      return null;
    }
};


const createUser = async(placeholder: placeholders) => {
  let sql = await getSqlQuery("create_user", "Authentication");
  sql = formatSql(sql, placeholder);
  console.log(sql)
  const pool: ConnectionPool | null = await getConnection();
  if(pool){
    const request: Request = await pool.request();
    try{
      let records: records<dUser> = await request.query(sql);
      return records.recordset;
    }
    catch(err){
      console.log('Cant retrieve data')
      return null;
    }
  }
  else{
    return null;
  }
}
export { findUserByEmail, createUser };

