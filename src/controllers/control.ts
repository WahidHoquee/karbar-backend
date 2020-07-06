import { RequestHandler } from "express";
import { dControl, getControls, getSubControls } from "../models/control";
import { placeholders } from "../utils/interface";

type fetchedControl = dControl[] | undefined;
type params = { menuParams: string }

const fetchControl: RequestHandler<params> = async (req, res) => {
    const menuParams = req.params.menuParams;
    let data: fetchedControl = await getControls('0010', '0100', menuParams);

    if (data) {
        const controls = await data?.map(async(dt) => {
            if (dt.ControlSQL) {
                const placeholders: placeholders = {
                    ClientCode: dt.ClientCode,
                    ModuleCode: dt.ModuleCode,
                    GCode: dt.GCode,
                    GLevel: dt.GLevel,
                    AType: dt.AType,
                    ADType: dt.ADType,
                    TType: dt.TType,
                    TDType: dt.TDType,
                    VDType: dt.VDType,
                    VType: dt.VType,
                    ACode: dt.ACode,
                    UIType: dt.UIType,
                    ALevel: dt.ALevel,
                    PCode: dt.PCode,
                    LCode: dt.LCode,
                };
                const records = await getSubControls(dt.ControlSQL, placeholders)
                if(records){
                    dt.ControlSQL = records[0];
                    dt.Params = records[1]
                }
            }
            return dt;
        });
        data = await Promise.all(controls);
        console.log('data')
        res.status(200).json(data);
    } 
    else {
        res.status(404).send("Cant retrieve data");
    }
};

export { fetchControl };
