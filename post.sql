----Exec [dbo].[JSONExpected] '@pJson'

CREATE PROCEDURE [dbo].[JSONExpected]
  @pJson nvarchar(max)

AS
BEGIN

  SELECT @pJson = 
N'{
      "gridControls": [
        {
			"cboVType": "CP",
	    "dtpVDate": "2020-08-05T09:32:00.000Z",
    "cboCSCode": "2115004",
    "txtChqNo": "5465456313248674",
    "dtpChqDate": "2020-08-27T09:32:00.000Z",
    "cboFPeriod": "None",
    "txtVDesc": "DBBL",

      "key": "790fac2d-2d00-4edc-9d4a-136fc4e47ac0",
      "cboACode": "040100200060007",
      "txtIDesc": "For Security Purpose",
      "decDebit": "5600",
      "decCredit": ""        
      },      
        {       
			"cboVType": "CP",
	    "dtpVDate": "2020-08-05T09:32:00.000Z",
    "cboCSCode": "2115004",
    "txtChqNo": "5465456313248674",
    "dtpChqDate": "2020-08-27T09:32:00.000Z",
    "cboFPeriod": "None",
    "txtVDesc": "DBBL",

      "key": "9e15069e-de05-40ca-b8f4-18c5afbc6f4d",
      "cboACode": "010200100010001",
      "txtIDesc": "Emergency Issue of a Stuff",
      "decDebit": "",
      "decCredit": "15000"        },
        {          
			"cboVType": "CP",
	    "dtpVDate": "2020-08-05T09:32:00.000Z",
    "cboCSCode": "2115004",
    "txtChqNo": "5465456313248674",
    "dtpChqDate": "2020-08-27T09:32:00.000Z",
    "cboFPeriod": "None",
    "txtVDesc": "DBBL",

      "key": "b320a0f3-47b8-4e63-838d-223b8fd3fddb",
      "cboACode": "020300100040001",
      "txtIDesc": "Software Sell",
      "decDebit": "9400",
      "decCredit": ""
        }
      ]
}'

  SELECT
    JSON_Value (p.value, '$.cboVType') as VType,
    JSON_Value (p.value, '$.dtpVDate') as VDate,
    JSON_Value (p.value, '$.cboCSCode') as CSCode,
    JSON_Value (p.value, '$.txtChqNo') as ChqNo,
    JSON_Value (p.value, '$.dtpChqDate') as ChqDate,
    JSON_Value (p.value, '$.cboFPeriod') as FPeriod,
    --------JSON_Value (p.value, '$.txtChqNo') as ChqNo, 
    JSON_Value (p.value, '$.txtVDesc') as VDesc,
    JSON_Value (p.value, '$.key') as xxkey,
    JSON_Value (p.value, '$.cboACode') as ACode,
    JSON_Value (p.value, '$.txtIDesc') as IDesc,
    JSON_Value (p.value, '$.decDebit') as Debit,
    JSON_Value (p.value, '$.decCredit') as Credit

  FROM OPENJSON (@pJson, '$.gridControls') as p

END