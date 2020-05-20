const database = require("../data");

const getReport = ({ gridSQL, data, chipData }) =>
    gridSQL
        .replace("@ACode", `'${chipData[0]}'`)
        .replace("@From", `'${data.dtpFrom}'`)
        .replace("@To", `'${data.dtpTo}'`);

exports.getReport = (req, resp) => {
    // const query = getReport(req.body);
    const query = `SELECT * FROM DBO.LCBR('0003', '0100', '0001', '01020010001', 'L', '01 Jan 2019', '15 Jan 2019')`
    database.executeSql(query, (data, error) => {
        if (error) {
            console.log(error);
        } else {
            resp.status(200).json(data.recordset);
        }
    });
};
