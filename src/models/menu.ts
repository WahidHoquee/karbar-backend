import { getSqlQuery, formatSql } from '../utils';
import { records } from '../utils/interface'

const getConnection = require('../data');

export interface dMenu{
  ACode: string | null;
  ClientCode: string | null;
  ModuleCode: string | null;
  PCode: string | null;
  AHead: string | null;
  MenuType: string | null;
  MenuParams: string | null;
  IconName: string | null;
  DisplayField: string | null;
}

const getMenu = async(ClientCode: string, ModuleCode: string, MenuType: string) => {
  let sql = await getSqlQuery('get_Menu');
  sql = formatSql(sql, { ClientCode, ModuleCode, MenuType })
  
  const pool = await getConnection();
  const request = await pool.request();
  
  try{
    let records: records<dMenu> = await request.query(sql);
    return records.recordset;
  }
  catch(err){
    console.log('Cant retrieve data')
  }
}

export { getMenu };