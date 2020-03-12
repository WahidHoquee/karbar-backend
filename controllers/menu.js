const database = require('../data');

const getMenu = (clientID) =>(
    `SELECT ClientCode,ModuleCode,ACode,PCode,AHead,MenuType,MenuParams,IconName FROM dbo.vDMenu_Data WHERE ClientCode = '0021' AND ModuleCode= '0100' AND MenuType='WA' AND (ACode LIKE '01%' AND NOT ACode='01' OR ACode LIKE '03%' AND NOT ACode='03' OR ACode LIKE '04%' AND NOT ACode='04') ORDER BY ACode`
)

exports.getMenu = (req,resp,next) => {
    database.executeSql(getMenu('0000'),(data,error) => {
        if (error) {
            console.log(error)
        } else {
            resp.status(200).json(data)        
        }
    })
}
