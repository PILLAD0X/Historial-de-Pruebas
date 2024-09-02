CREATE PROCEDURE GetSiplaceComponents(
	 @Serialnumber VARCHAR(24),
	 @SMTLine INT
)
AS
BEGIN
	
	IF(@SMTline = 5)
		BEGIN
			SELECT *  FROM [USVAMEISMX-P1].[LHEE_ASE5TRACE].[trc].[SmtTraceabilitySiplace] WHERE Barcode = @Serialnumber
		END
	ELSE IF(@SMTline = 7)
		BEGIN
			SELECT * FROM [USVAMEISMX-P1].[LHEE_ASE7TRACE].[trc].[SmtTraceabilitySiplace] WHERE Barcode = @Serialnumber
		END
	ELSE IF(@SMTline = 8)
		BEGIN
			SELECT * FROM [USVAMEISMX-P1].[LHEE_ASE8TRACE].[trc].[SmtTraceabilitySiplace] WHERE Barcode = @Serialnumber
		END
	ELSE IF(@SMTline = 9)
		BEGIN
			SELECT * FROM [USVAMEISMX-P1].[LHEE_ASE9TRACE].[trc].[SmtTraceabilitySiplace] WHERE Barcode = @Serialnumber
		END
	ELSE IF(@SMTline = 10)
		BEGIN
			SELECT * FROM [USVAMEISMX-P1].[LHEE_CIE1TRACE].[trc].[SmtTraceabilitySiplace] WHERE Barcode = @Serialnumber
		END
	ELSE IF(@SMTline = 11)
		BEGIN
			SELECT * FROM [USVAMEISMX-P1].[LHEE_CE11TRACE].[trc].[SmtTraceabilitySiplace] WHERE Barcode = @Serialnumber
		END
	ELSE IF(@SMTline = 12)
		BEGIN
			SELECT * FROM [USVAMEISMX-P1].[LHEE_CE12TRACE].[trc].[SmtTraceabilitySiplace] WHERE Barcode = @Serialnumber
		END
	ELSE IF(@SMTline = 13)
		BEGIN
			SELECT * FROM [USVAMEISMX-P1].[LHEE_ASE13TRACE].[trc].[SmtTraceabilitySiplace] WHERE Barcode = @Serialnumber
		END
	
END