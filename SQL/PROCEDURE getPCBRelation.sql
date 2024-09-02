USE [CTRv2]
GO
 --Created by JULIO PILLADO. Script Date: 7/03/2024 8:20:18 AM 
CREATE PROCEDURE getPCBRelation(
	@year int,
	@SerialP1 varchar(10),
	@SerialP2 varchar(13)
	)
AS
BEGIN
    DECLARE @TableName NVARCHAR(255);
    DECLARE @SQL NVARCHAR(MAX);

    -- Map the year to the corresponding table name
    SET @TableName = CASE 
                        WHEN @year = 0 THEN 'TraceabilityProductTHTInfo_Archive2020'
                        WHEN @year = 1 THEN 'TraceabilityProductTHTInfo_Archive2021'
                        WHEN @year = 2 THEN 'TraceabilityProductTHTInfo_Archive2022'
                        WHEN @year = 3 THEN 'TraceabilityProductTHTInfo_Archive2023'
                        WHEN @year = 4 THEN 'TraceabilityProductTHTInfo_Archive2024'
                        WHEN @year = 7 THEN 'TraceabilityProductTHTInfo_Archive2017'
                        WHEN @year = 8 THEN 'TraceabilityProductTHTInfo_Archive2018'
                        WHEN @year = 9 THEN 'TraceabilityProductTHTInfo_Archive2019'
                        ELSE NULL
                     END;

    IF @TableName IS NOT NULL
    BEGIN
        -- Construct the dynamic SQL query
        SET @SQL = N'SELECT TOP (1) BSS_Barcode, TSS_Barcode
                     FROM [Traceability].[dbo].[' + @TableName + N']
                     WHERE BSS_Barcode LIKE @serialP1 + ''%'' + @serialP2
                     OR TSS_Barcode LIKE @serialP1 + ''%'' + @serialP2
                     ORDER BY TimeSpan';

        -- Execute the dynamic SQL query
        EXEC sp_executesql @SQL, 
                           N'@serialP1 VARCHAR(10), @serialP2 VARCHAR(13)', 
                           @serialP1, @serialP2;
    END
    ELSE
    BEGIN
        PRINT('NO EXISTEN DATOS');
    END
END;

--2017
CREATE INDEX IX_TraceabilityProductTHTInfo_Archive2017_BSS_Barcode
ON [Traceability].[dbo].[TraceabilityProductTHTInfo_Archive2021](BSS_Barcode);

CREATE INDEX IX_TraceabilityProductTHTInfo_Archive2017_TSS_Barcode
ON [Traceability].[dbo].[TraceabilityProductTHTInfo_Archive2021](TSS_Barcode);

CREATE INDEX IX_TraceabilityProductTHTInfo_Archive2017_Barcodes
ON [Traceability].[dbo].[TraceabilityProductTHTInfo_Archive2021](BSS_Barcode, TSS_Barcode);

--2018
CREATE INDEX IX_TraceabilityProductTHTInfo_Archive2018_BSS_Barcode
ON [Traceability].[dbo].[TraceabilityProductTHTInfo_Archive2021](BSS_Barcode);

CREATE INDEX IX_TraceabilityProductTHTInfo_Archive2018_TSS_Barcode
ON [Traceability].[dbo].[TraceabilityProductTHTInfo_Archive2021](TSS_Barcode);

CREATE INDEX IX_TraceabilityProductTHTInfo_Archive2018_Barcodes
ON [Traceability].[dbo].[TraceabilityProductTHTInfo_Archive2021](BSS_Barcode, TSS_Barcode);

--2019
CREATE INDEX IX_TraceabilityProductTHTInfo_Archive2019_BSS_Barcode
ON [Traceability].[dbo].[TraceabilityProductTHTInfo_Archive2021](BSS_Barcode);

CREATE INDEX IX_TraceabilityProductTHTInfo_Archive2019_TSS_Barcode
ON [Traceability].[dbo].[TraceabilityProductTHTInfo_Archive2021](TSS_Barcode);

CREATE INDEX IX_TraceabilityProductTHTInfo_Archive2019_Barcodes
ON [Traceability].[dbo].[TraceabilityProductTHTInfo_Archive2021](BSS_Barcode, TSS_Barcode);

--2020
CREATE INDEX IX_TraceabilityProductTHTInfo_Archive2020_BSS_Barcode
ON [Traceability].[dbo].[TraceabilityProductTHTInfo_Archive2021](BSS_Barcode);

CREATE INDEX IX_TraceabilityProductTHTInfo_Archive2020_TSS_Barcode
ON [Traceability].[dbo].[TraceabilityProductTHTInfo_Archive2021](TSS_Barcode);

CREATE INDEX IX_TraceabilityProductTHTInfo_Archive2020_Barcodes
ON [Traceability].[dbo].[TraceabilityProductTHTInfo_Archive2021](BSS_Barcode, TSS_Barcode);

--2021
CREATE INDEX IX_TraceabilityProductTHTInfo_Archive2021_BSS_Barcode
ON [Traceability].[dbo].[TraceabilityProductTHTInfo_Archive2021](BSS_Barcode);

CREATE INDEX IX_TraceabilityProductTHTInfo_Archive2021_TSS_Barcode
ON [Traceability].[dbo].[TraceabilityProductTHTInfo_Archive2021](TSS_Barcode);

CREATE INDEX IX_TraceabilityProductTHTInfo_Archive2021_Barcodes
ON [Traceability].[dbo].[TraceabilityProductTHTInfo_Archive2021](BSS_Barcode, TSS_Barcode);

-- Para el archivo de 2022
CREATE INDEX IX_TraceabilityProductTHTInfo_Archive2022_BSS_Barcode
ON [Traceability].[dbo].[TraceabilityProductTHTInfo_Archive2022](BSS_Barcode);

CREATE INDEX IX_TraceabilityProductTHTInfo_Archive2022_TSS_Barcode
ON [Traceability].[dbo].[TraceabilityProductTHTInfo_Archive2022](TSS_Barcode);

CREATE INDEX IX_TraceabilityProductTHTInfo_Archive2022_Barcodes
ON [Traceability].[dbo].[TraceabilityProductTHTInfo_Archive2022](BSS_Barcode, TSS_Barcode);

--2023
CREATE INDEX IX_TraceabilityProductTHTInfo_Archive2023_BSS_Barcode
ON [Traceability].[dbo].[TraceabilityProductTHTInfo_Archive2021](BSS_Barcode);

CREATE INDEX IX_TraceabilityProductTHTInfo_Archive2023_TSS_Barcode
ON [Traceability].[dbo].[TraceabilityProductTHTInfo_Archive2021](TSS_Barcode);

CREATE INDEX IX_TraceabilityProductTHTInfo_Archive2023_Barcodes
ON [Traceability].[dbo].[TraceabilityProductTHTInfo_Archive2021](BSS_Barcode, TSS_Barcode);

--2024
CREATE INDEX IX_TraceabilityProductTHTInfo_Archive2024_BSS_Barcode
ON [Traceability].[dbo].[TraceabilityProductTHTInfo_Archive2021](BSS_Barcode);

CREATE INDEX IX_TraceabilityProductTHTInfo_Archive2024_TSS_Barcode
ON [Traceability].[dbo].[TraceabilityProductTHTInfo_Archive2021](TSS_Barcode);

CREATE INDEX IX_TraceabilityProductTHTInfo_Archive2024_Barcodes
ON [Traceability].[dbo].[TraceabilityProductTHTInfo_Archive2021](BSS_Barcode, TSS_Barcode);