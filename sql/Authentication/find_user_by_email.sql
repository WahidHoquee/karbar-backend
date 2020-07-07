SELECT ClientCode, ModuleCode, LCode, GroupName, UserId, UserName, UserPass, Email
FROM DUser
WHERE Email = @Email