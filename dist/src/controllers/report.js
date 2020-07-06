"use strict";
var database = require("../data");
var getReport = function (_a) {
    var gridSQL = _a.gridSQL, data = _a.data, chipData = _a.chipData;
    return gridSQL
        .replace("@ACode", "'" + chipData[0] + "'")
        .replace("@From", "'" + data.dtpFrom + "'")
        .replace("@To", "'" + data.dtpTo + "'");
};
exports.getReport = function (req, resp) {
    // const query = getReport(req.body);
    var query = "SELECT * FROM DBO.LCBR('0003', '0100', '0001', '01020010001', 'L', '01 Jan 2019', '15 Jan 2019')";
    database.executeSql(query, function (data, error) {
        if (error) {
            console.log(error);
        }
        else {
            resp.status(200).json(data.recordset);
        }
    });
};
