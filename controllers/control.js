const database = require("../data");

const getControl = (clientCode, moduleCode, menuParams) =>
	`SELECT ControlName, ControlLabel, ControlDisplayName, ControlElementType, ControlIndex, IsGridControl, GridWidth, Pattern, MinLength, MaxLength, IsRequired, MenuButton, ControlSQL, ClientCode, ModuleCode, GCode, GLevel, AType, ADType, TType, TDType, VDType, VType, ACode, UIType, ALevel, PCode, LCode FROM v_Menu_Control_Report WHERE ClientCode='0010' AND ModuleCode='0100' AND MenuParams='${menuParams}' ORDER BY ControlIndex`;

const getControlSQL = (control) => {
	const {ControlSQL, ClientCode, ModuleCode, GCode, GLevel, AType, ADType, TType, TDType, VDType, VType, ACode, UIType, ALevel, PCode, LCode} = control
	return ControlSQL
		.replace("@ClientCode", `'${ClientCode}'`)
		.replace("@ModuleCode", `'${ModuleCode}'`)
		.replace("@LCode",  `'${LCode}'`)
		.replace("@GCode",  `'${GCode}'`)
		.replace("@GLevel",  `'${GLevel}'`)
		.replace("@AType", `'${AType}'`)
		.replace("@ADType", `'${ADType}'`)
		.replace("@TType", `'${TType}'`)
		.replace("@TDType", `'${TDType}'`)
		.replace("@VDType", `'${VDType}'`)
		.replace("@VType", `'${VType}'`)
		.replace("@ACode", `'${ACode}'`)
		.replace("@UIType", `'${UIType}'`)
		.replace("@ALevel", `'${ALevel}'`)
		.replace("@PCode", `'${PCode}'`)
		.replace("@LCode", `'${LCode}'`)
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

					let {ControlName, ControlLabel, ControlDisplayName, ControlElementType, ControlIndex, IsGridControl, GridWidth, Pattern, MinLength, MaxLength, IsRequired, MenuButton} = record; 
					const controlData = {ControlName, ControlLabel, ControlDisplayName, ControlElementType, ControlIndex, IsGridControl, GridWidth, Pattern, MinLength, MaxLength, IsRequired, MenuButton};

					if (record.ControlSQL) {
						let data = controlData;
						const query = getControlSQL(record);
						if(query.includes("@")){
							data = await {
								...controlData,
								SQL: query,
							}
						}
						else{
							await database.executeSql(query, async (paramData) => {
								data = await {
									...controlData,
									SQL: query,
									Params: [...paramData.recordset]
								};
							}) 
						}
						return data;
					} 
					else {
						return controlData;
					}
			});
			const controls = await Promise.all(records);
			await resp.status(200).json(controls);
        }
    })
};
