import { getSqlQuery, formatSql } from '../utils'
import { placeholders, records } from '../utils/interface'

import { Request, ConnectionPool } from 'mssql';
import { getConnection } from '../database/connection'

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

const getControls = async(ClientCode: string, ModuleCode: string, MenuParams: string) : Promise<dControl[] | null> => {
  let sql = await getSqlQuery("get_Control");
  sql = formatSql(sql, { ClientCode, ModuleCode, MenuParams })

  console.log('')
  console.log(sql)
  console.log('')
  console.log('-----------------------------------------------------------------------------------------------------------');
  console.log('-----------------------------------------------------------------------------------------------------------');
  console.log('')

  const pool: ConnectionPool | null = await getConnection();
  if(pool){
    const request: Request = await pool.request();
    try{
      let records: records<dControl> = await request.query(sql);
      console.log('Successfully Executed the Control SQL Query of " ' + MenuParams + ' "')
      console.log('')
      console.log('***********************************************************************************************************');
      console.log('Control Params SQL => ')
      console.log('')
      return records.recordset;
    }
    catch(err){
      console.log('Error in executing the Control SQL Query of " ' + MenuParams + ' "')
      console.log(err)
      console.log('')
      console.log('***********************************************************************************************************');
      console.log('Control Params SQL => ')
      console.log('')
      return null;
    }
  }
  else{
    return null;
  }
}



export interface dControlParams{
  [key: string]: string | number | null
}

const getSubControls = async(controlName:string, sql: string, placeholders: placeholders): Promise<[string, dControlParams[]] | undefined> => {
  // console.log(placeholders)
  // let sql = formatSql(query, placeholders);
  
  console.log(controlName + ': ' + sql)
  console.log('')

  const pool = await getConnection();
  if(pool){
    const request = await pool.request();

    try{
      let records: records<dControlParams> = await request.query(sql);
      return [ sql, records.recordset ] ;
    }
    catch(err){
      //! If the SQL Query is alright, But still we cant retrive the data then we should uncomment the following Console log's
      // console.log('-----------------------------------------------------------------------------------------------------------');
      // console.log('Error in executing the Control Params SQL Query of " ' + controlName + ' "')
      // console.log(err)
      // console.log('')
    }
  }
}

export { getControls, getSubControls };