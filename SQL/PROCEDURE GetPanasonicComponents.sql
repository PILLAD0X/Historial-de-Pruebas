CREATE PROCEDURE GetPanasonicComponents(
	 @Serialnumber VARCHAR(13),
	 @SerialNumberP2 VARCHAR(13)
)
AS
BEGIN
	
	SELECT *
	FROM [USVAMEISMX-P1].[AsdTrace].[trc].[SmtTraceabilityPanasonic]
	WHERE Barcode LIKE @SerialNumberP1+'%'+@SerialNumberP2
	ORDER BY [CreateTime] ASC
	
END