import { getSqlQuery, formatSql } from '../utils'
import { placeholders, records } from '../utils/interface'
import { Request, ConnectionPool } from 'mssql';
const getConnection = require('../database/connection');

export interface dControl {
  ControlName: string | null;
  ControlLabel: string | null;
  ControlDisplayName: string | null;
  ControlElementType: string | null;
  ControlIndex: number | null;
  MenuButton: string | null;
  ControlSQL: string | null;
  ClientCode: string | null;
  ModuleCode: string | null;
  GCode: string | null;
  GLevel: string | null;
  AType: string | null;
  ADType: string | null;
  TType: string | null;
  TDType: string | null;
  VDType: string | null;
  VType: string | null;
  ACode: string | null;
  UIType: string | null;
  ALevel: string | null;
  PCode: string | null;
  LCode: string | null;
  Params?: dControlParams[]
}
// Promise<dControl[] | undefined>
const getControls = async(ClientCode: string, ModuleCode: string, MenuParams: string) : Promise<any> => {
  let sql = await getSqlQuery("get_Control");
  sql = formatSql(sql, { ClientCode, ModuleCode, MenuParams })
  
  const pool: ConnectionPool = await getConnection();
  const request: Request = await pool.request();
  
  try{
    // let records: records<dControl> = await request.query(sql);
    return records.recordset;
  }
  catch(err){
    console.log('Cant retrieve data')
  }
}



export interface dControlParams{
  [key: string]: string | number | null
}

const getSubControls = async(query: string, placeholders: placeholders): Promise<[string, dControlParams[]] | undefined> => {
  let sql = formatSql(query, placeholders);

  const pool = await getConnection();
  const request = await pool.request();

  try{
    let records: records<dControlParams> = await request.query(sql);
    return [ sql, records.recordset ] ;
  }
  catch(err){
    console.log('Cant retrieve data')
  }
}

export { getControls, getSubControls };