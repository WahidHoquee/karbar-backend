SELECT DISTINCT ACode,ClientCode,ModuleCode,PCode,AHead,MenuType,MenuParams,IconName,DisplayField 
FROM dbo.vDMenu_Data 
WHERE 
ClientCode = @ClientCode AND 
ModuleCode = @ModuleCode AND 
MenuType = @MenuType  AND 
(
    ACode LIKE '01%' AND NOT ACode='01' OR
    ACode LIKE '02%' OR 
    ACode LIKE '03%' AND NOT ACode='03' OR 
    ACode LIKE '04%' AND NOT ACode='04'
)
ORDER BY ACode