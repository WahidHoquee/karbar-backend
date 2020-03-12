const sql = require("mssql");
const config = require("../config");

exports.executeSql = async (query, callback, isStoredProcedure = false) => {
	try {
		let pool = await sql.connect(config.sql);
		console.log('object')
		if (pool.connecting) {
			console.log("Connecting to the Database");
		} 
		else if (pool.connected) {
			console.log("Connected");
	
			try {
				let request = await pool.request();
				const recordset = await request.query(query);
				callback(recordset)
			} 
			catch (error) {
				callback(null, error)
			}
		}
	}
	catch (error) {
		callback(null, error)
	}
};
