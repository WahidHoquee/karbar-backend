const database = require("../data");

const getControl = (clientCode, moduleCode, menuParams) =>
	`SELECT ControlName, ControlLabel, ControlDisplayName, ControlElementType, ControlIndex, MenuButton, ControlSQL, ClientCode, ModuleCode, GCode, GLevel, AType, ADType, TType, TDType, VDType, VType, ACode, UIType, ALevel, PCode, LCode FROM v_Menu_Control_Report WHERE ClientCode='0011' AND ModuleCode='0100' AND MenuParams='${menuParams}'`;

const getControlSQL = ({ControlSQL, ClientCode, ModuleCode, GCode, GLevel,
	AType,
	ADType,
	TType,
	TDType,
	VDType,
	VType,
	ACode,
	UIType,
	ALevel,
	PCode,
	LCode
}) => {
	const sql = ControlSQL.replace("@ClientCode", ClientCode)
		.replace("@ModuleCode", ModuleCode)
		.replace("@GCode", GCode)
		.replace("@LCode", LCode);
	// console.log(sql)
	return sql;
};

exports.getControl = async (req, resp, next) => {
	await database.executeSql(getControl(null, null, req.params.menuParams),
	async (data,error) => {
        if (error) {
            console.log(error)
		} 
		else {
			let records = await data.recordset.map(
				async (record) => {
					if (record.ControlSQL) {
						let data = record;
						await database.executeSql(getControlSQL(record), async (paramData) => {
							data = await {
								...record,
								params: [...paramData.recordset]
							};
						})
						return data;
					} 
					else {
						return record;
					}
			});
			const controls = await Promise.all(records);
			await resp.status(200).json(controls);
        }
    })
};
