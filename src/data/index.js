const sql = require("mssql");
const config = require("../config");

// const getConnection = async () => {
//     let pool = null;

//     const closePool = async () => {
//         console.log(1)
//         try {
//             await pool.close();
//             pool = null;
//         } catch (err) {
//             pool = null;
//             console.log("Cant close the pool, Maybe Pool is already closed");
//         }
//     };

//     try {
//         console.log(2)

//         // if (pool) return pool;

//         pool = await sql.connect(config);
//         console.log('s')
//         pool.on("error", async (err) => {
//             console.log("Connection Error, Closing the Pool");
//             await closePool();
//         });

//         return pool;
//     } catch (err) {
//         console.log(3)

//         console.log("Error connnecting to the SQL Server");
//         pool = null;
//     }
// };


const getConnection = async (query, callback, isStoredProcedure = false) => {
	try {
		// console.log(1)
		// console.log(config)
		let pool = await sql.connect(config.sql);
		// console.log(2)
	// 	if (pool.connecting) {
	// 		console.log("Connecting to the Database");
	// 	}
	// 	else if (pool.connected) {
	// 		console.log("Connected");

	// 		try {
	// 			let request = await pool.request();
	// 			const recordset = await request.query(query);
	// 			callback(recordset)
	// 		}
	// 		catch (error) {
	// 			callback(null, error)
	// 		}
    // 	}
        return pool
	}
	catch (error) {
		// callback(null, error)
	}
};

module.exports = getConnection;
