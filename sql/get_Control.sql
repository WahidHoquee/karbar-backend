SELECT 
    AHead, ControlName, MenuParams, ControlLabel, ControlDisplayName, ControlElementType, ControlIndex, MenuButton, SPName, ControlSQL, ClientCode, IsGridControl, ModuleCode, GCode, GLevel, AType, ADType, TType, TDType, VDType, VType, ACode, UIType, ALevel, PCode, LCode 
FROM v_Menu_Control_Report 
WHERE ClientCode = @ClientCode AND ModuleCode = @ModuleCode AND MenuParams IN ( @MenuParams )
ORDER BY ControlIndex