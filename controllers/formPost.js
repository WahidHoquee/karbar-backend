const database = require("../data");

const getGridControlSQL= (type, master, formData, gridControlData) => {
    //Genarating Master Key value
    const masterInit = Object.values(master).map(mas => `'${mas}'`).join(", ");

    //Genarating Form Key value
    const formInit = Object.values(formData).map(mas => `'${mas}'`).join(", ")

    //Genarating GridControl Key value
    let initializer = `SELECT ${masterInit}, ${formInit}, `

    const gridControlSQL = gridControlData.map(data => { 
        const formValues = Object.values(data).map((dt, index, arr) => index+1 === arr.length ? `'${dt}' ` : `'${dt}',`)
        return initializer.concat(...formValues)
    }).join('UNION ')

    return gridControlSQL;
}

const nameToColumnName = (formData) => {
    return Object.keys(formData).map(dt => dt.substring(3))
}

const postFormSQL = (master, form, data) => {
    const masterKey = Object.keys(master).join(', ')
    const formKey = nameToColumnName(form).join(', ')
    const gridKey = nameToColumnName(data[0]).join(', ')
    return `INSERT INTO VoucherTemp (${masterKey}, ${formKey}, ${gridKey}) ${getGridControlSQL('JV', master, form, data)}`
}

exports.postForm = (req, resp) => {
    // const {formData, chipData, gridControlData} = req.body;
    // const data = gridControlData.map(data => {
    //     delete data.key;
    //     return data;
    // })
    const formData = {
        cboCSCode: "2105014",
        cboVType: "None",
        dtpChqDate: '18 Jan 2018',
        dtpVDate:'26 Mar 2018',
        txtChqNo: "23135786123",
        txtVDesc: "Mobile Sell",
    }
    const data = [
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
    ]

    const master = {
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
    }

    const query = postFormSQL(master, formData, data);
    console.log(query)
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
