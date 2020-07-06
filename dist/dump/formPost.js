"use strict";
var database = require("../data");
var getGridControlSQL = function (type, master, formData, gridControlData) {
    //Genarating Master Key value
    var masterInit = Object.values(master).map(function (mas) { return "'" + mas + "'"; }).join(", ");
    //Genarating Form Key value
    var formInit = Object.values(formData).map(function (mas) { return "'" + mas + "'"; }).join(", ");
    //Genarating GridControl Key value
    var initializer = "SELECT " + masterInit + ", " + formInit + ", ";
    var gridControlSQL = gridControlData.map(function (data) {
        var formValues = Object.values(data).map(function (dt, index, arr) { return index + 1 === arr.length ? "'" + dt + "' " : "'" + dt + "',"; });
        return initializer.concat.apply(initializer, formValues);
    }).join('UNION ');
    return gridControlSQL;
};
var nameToColumnName = function (formData) {
    return Object.keys(formData).map(function (dt) { return dt.substring(3); });
};
var postFormSQL = function (master, form, data) {
    var masterKey = Object.keys(master).join(', ');
    var formKey = nameToColumnName(form).join(', ');
    var gridKey = nameToColumnName(data[0]).join(', ');
    return "INSERT INTO VoucherTemp (" + masterKey + ", " + formKey + ", " + gridKey + ") " + getGridControlSQL('JV', master, form, data);
};
exports.postForm = function (req, resp) {
    // const {formData, chipData, gridControlData} = req.body;
    // const data = gridControlData.map(data => {
    //     delete data.key;
    //     return data;
    // })
    var formData = {
        cboCSCode: "2105014",
        cboVType: "None",
        dtpChqDate: '18 Jan 2018',
        dtpVDate: '26 Mar 2018',
        txtChqNo: "23135786123",
        txtVDesc: "Mobile Sell",
    };
    var data = [
        {
            cboACode: '',
            txtIDesc: '5463',
            decCredit: '',
            decDebit: '',
        },
        {
            cboACode: '',
            txtIDesc: '456',
            decCredit: '',
            decDebit: '',
        }
    ];
    var master = {
        ClientCode: '0010',
        ModuleCode: '0100',
        LCode: 'LCode',
        GCode: '',
        AType: '',
        ADType: '',
        TType: '',
        TDType: 'TDType',
        VDType: '',
        UIType: '',
    };
    var query = postFormSQL(master, formData, data);
    console.log(query);
    // database.executeSql(query, (data, error) => {
    //     if (error) {
    //         console.log(error);
    //     } else {
    //         resp.status(200).json(query);
    //     }
    // });
};
// const formData = {
//     cboCSCode: "2105014",
//     cboVType: "None",
//     dtpChqDate: '18 Jan 2018',
//     dtpVDate:'26 Mar 2018',
//     txtChqNo: "23135786123",
//     txtVDesc: "Mobile Sell",
//     key: '090'
// }
// const data = [
//     {
//       cboACode: '',
//       txtIDesc: '5463',
//       decCredit: '',
//       decDebit: '',
//     },
//     {
//       cboACode: '',
//       txtIDesc: '456',
//       decCredit: '',
//       decDebit: '',
//     }
// ]
// console.log(gridControlSQL)
