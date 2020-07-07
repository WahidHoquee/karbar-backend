import sql, { ConnectionPool, ConnectionError, config } from 'mssql'
const config = require("../config");

const getConnection = async () : Promise<ConnectionPool | null> => {
    let pool: ConnectionPool | null = null;

    const closePool = async () => {
        try {
            pool && await pool.close();
            pool = null;
            return pool;
        } 
        catch (err) {
            pool = null;
            console.log("Cant close the pool, Maybe Pool is already closed");
            return pool;
        }
    };

    try {
        pool = await new sql.ConnectionPool(config.sql as config)
        if(pool){
            pool.on("error", async (err: ConnectionError) => {
                console.log("Connection Error, Closing the Pool" + err);
                await closePool();
            });
            return await pool.connect();
        }
        else{
            console.error('No Existing Pool Available');
            return null;
        }
    } 
    catch (err) {
        console.log("Error connnecting to the SQL Server" + err);
        pool = null;
        return pool;
    }
};

export {getConnection};
