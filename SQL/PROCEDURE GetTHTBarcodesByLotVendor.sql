CREATE PROCEDURE GetTHTBarcodesByLotVendor
    @LotVendor NVARCHAR(50),
	@Material NVARCHAR(100)
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @SQL NVARCHAR(MAX);
    DECLARE @TableName NVARCHAR(255);

    -- Inicializar la variable SQL
    SET @SQL = N'';

    -- Cursor para recorrer todas las tablas que coincidan con el patrón de nombre
    DECLARE table_cursor CURSOR FOR
    SELECT table_name 
    FROM [Traceability].INFORMATION_SCHEMA.TABLES 
    WHERE table_name LIKE 'TraceabilityProductTHTInfo_Archive%';

    OPEN table_cursor;

    FETCH NEXT FROM table_cursor INTO @TableName;

    WHILE @@FETCH_STATUS = 0
    BEGIN
        SET @SQL = @SQL + N'SELECT TSS_Barcode, BSS_Barcode
                            FROM [Traceability].[dbo].[' + @TableName + N']
                            WHERE Lot_Vendor = @LotVendor AND PartNumber = @Material
							GROUP BY BSS_Barcode, TSS_Barcode
                            UNION ALL ';
        FETCH NEXT FROM table_cursor INTO @TableName;
    END;

    -- Cerrar el cursor y desasignar recursos
    CLOSE table_cursor;
    DEALLOCATE table_cursor;

    -- Quitar la última 'UNION ALL'
    SET @SQL = LEFT(@SQL, LEN(@SQL) - 10);

    -- Ejecutar la consulta dinámica
    IF LEN(@SQL) > 0
    BEGIN
        EXEC sp_executesql @SQL, N'@LotVendor NVARCHAR(50), @Material NVARCHAR(100)', @LotVendor, @Material;
    END
    ELSE
    BEGIN
        PRINT 'No tables found matching the pattern TraceabilityProductTHTInfo_ArchiveYYYY';
    END
END;
