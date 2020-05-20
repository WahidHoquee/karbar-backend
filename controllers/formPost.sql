Select ACode, AHead, IDesc, 0.00 As SQty, ATitle, 0.00 As SRate, 0 as IDiscP, 0.00 as IDiscA, 0.00 As Debit From COAData('0000', '0100', '0001', '2104', '4', 0, 0)

Select 'lbl' as ACode, 'txt', 'num', 0.00 As SQty, 'txt' , 0.00 As SRate, 0 as IDiscP, 0.00 as IDiscA, 0.00 As Debit,1 as RL
UNION
Select ACode, AHead, IDesc, 0.00 As SQty, ATitle, 0.00 As SRate, 0 as IDiscP, 0.00 as IDiscA, 0.00 As Debit,2 as RL From COAData('0000', '0100', '0001', '2104', '4', 0, 0)
ORDER BY RL