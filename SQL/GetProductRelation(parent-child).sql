CREATE PROCEDURE [dbo].[GetProductRelation]
    @serialNumber VARCHAR(80)
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @parent VARCHAR(80) = NULL;
    DECLARE @child VARCHAR(24) = NULL;
    DECLARE @mfg_year INT = NULL;
    DECLARE @serialP1 VARCHAR(10) = NULL;
    DECLARE @serialP2 VARCHAR(13) = NULL;
    DECLARE @SQL NVARCHAR(MAX);
    DECLARE @BaseYear INT;
    DECLARE @yearSuffix CHAR(1);
    DECLARE @TableName NVARCHAR(255);
    DECLARE @BSS_Barcode VARCHAR(24) = @serialNumber;

    -- Temporary table to hold the final result
    CREATE TABLE #Result (
        parent VARCHAR(80),
        child VARCHAR(24),
        BSS_Barcode VARCHAR(24),
        mfg_year INT
    );

    PRINT '--- BEGIN PROCEDURE ---';
    PRINT 'Input Serial Number: ' + @serialNumber;

    -- First query: Try to find the parent-child relationship
    SELECT TOP(1) 
        @parent = [parent], 
        @child = [child], 
        @mfg_year = RIGHT(YEAR(createdate), 1)
    FROM [AmpRelation].[dbo].[ParentChildRelationship]
    WHERE parent = @serialNumber OR child = @serialNumber
    ORDER BY createdate DESC;

    PRINT 'Step 1: First Query Results';
    PRINT 'Parent: ' + ISNULL(@parent, 'NULL');
    PRINT 'Child: ' + ISNULL(@child, 'NULL');
    PRINT 'Manufacturing Year: ' + ISNULL(CAST(@mfg_year AS VARCHAR), 'NULL');

    -- If a relationship is found, proceed to split child serial number
    IF @parent IS NOT NULL AND @child IS NOT NULL
    BEGIN
        SET @serialP1 = LEFT(@child, 10);
        SET @serialP2 = RIGHT(@child, 13);

        PRINT 'Step 2: Found Parent-Child Relationship';
        PRINT 'SerialP1: ' + @serialP1;
        PRINT 'SerialP2: ' + @serialP2;

        -- Determine the manufacturing year for further query
        SET @BaseYear = YEAR(GETDATE()) - (YEAR(GETDATE()) % 10) + @mfg_year;

        PRINT 'Base Year for Traceability: ' + ISNULL(CAST(@BaseYear AS VARCHAR), 'NULL');

        IF @BaseYear IS NOT NULL
        BEGIN
            SET @TableName = 'TraceabilityProductTHTInfo_Archive' + CAST(@BaseYear AS VARCHAR(4));

            PRINT 'Step 3: Using Table: ' + @TableName;

            -- Dynamic SQL for querying the appropriate traceability table
            SET @SQL = N'INSERT INTO #Result (parent, child, BSS_Barcode, mfg_year)
                         SELECT TOP (1) @parent AS parent, @child AS child, BSS_Barcode, @mfg_year AS mfg_year
                         FROM [Traceability].[dbo].[' + @TableName + N']
                         WHERE BSS_Barcode LIKE @serialP1 + ''%'' + @serialP2
                         OR TSS_Barcode LIKE @serialP1 + ''%'' + @serialP2
                         ORDER BY TimeSpan';

            PRINT 'Dynamic SQL: ' + @SQL;

            -- Execute the dynamic SQL query
            EXEC sp_executesql @SQL, 
                               N'@serialP1 VARCHAR(10), @serialP2 VARCHAR(13), @parent VARCHAR(80), @child VARCHAR(24), @mfg_year INT', 
                               @serialP1, @serialP2, @parent, @child, @mfg_year;
        END
    END
    ELSE IF LEN(@serialNumber) = 23 -- If no relationship found and the serialNumber length is 23
    BEGIN
        SET @serialP1 = LEFT(@serialNumber, 10);
        SET @serialP2 = RIGHT(@serialNumber, 13);

        PRINT 'Step 4: No Parent-Child Relationship, Treating Serial as BSS_Barcode';
        PRINT 'SerialP1: ' + @serialP1;
        PRINT 'SerialP2: ' + @serialP2;

        -- Determine year suffix from the serial number
        SET @yearSuffix = SUBSTRING(@serialNumber, 2, 1);

        PRINT 'Year Suffix: ' + @yearSuffix;

        -- Determine base year based on the year suffix
        SET @BaseYear = 
            CASE 
                WHEN @yearSuffix = '7' THEN 2017
                WHEN @yearSuffix = '8' THEN 2018
                WHEN @yearSuffix = '9' THEN 2019
                WHEN @yearSuffix = '0' THEN 2020
                WHEN @yearSuffix = '1' THEN 2021
                WHEN @yearSuffix = '2' THEN 2022
                WHEN @yearSuffix = '3' THEN 2023
                WHEN @yearSuffix = '4' THEN 2024
                ELSE NULL
            END;

        PRINT 'Calculated Base Year: ' + ISNULL(CAST(@BaseYear AS VARCHAR), 'NULL');

        -- Ensure only the last digit of the year is used for consistency
        SET @mfg_year = RIGHT(CAST(@BaseYear AS VARCHAR(4)), 1);

        PRINT 'Final Manufacturing Year Suffix: ' + ISNULL(CAST(@mfg_year AS VARCHAR), 'NULL');

        IF @BaseYear IS NOT NULL
        BEGIN
            -- Generate dynamic query for all traceability tables based on the base year
            SET @TableName = 'TraceabilityProductTHTInfo_Archive' + CAST(@BaseYear AS VARCHAR(4));

            PRINT 'Step 5: Using Table: ' + @TableName;

            SET @SQL = N'INSERT INTO #Result (parent, child, BSS_Barcode, mfg_year)
                         SELECT TOP (1) NULL AS parent, TSS_Barcode AS child, BSS_Barcode AS BSS_Barcode, @mfg_year AS mfg_year
                         FROM [Traceability].[dbo].[' + @TableName + N']
                         WHERE BSS_Barcode LIKE @serialP1 + ''%'' + @serialP2
                         OR TSS_Barcode LIKE @serialP1 + ''%'' + @serialP2
                         ORDER BY TimeSpan';

            PRINT 'Dynamic SQL for Serial Number Lookup: ' + @SQL;

            -- Execute the dynamic SQL query
            EXEC sp_executesql @SQL, 
                               N'@serialP1 VARCHAR(10), @serialP2 VARCHAR(13), @mfg_year INT, @serialNumber VARCHAR(24)', 
                               @serialP1, @serialP2, @mfg_year, @serialNumber;

            -- If a child is found, search for its corresponding parent
            IF EXISTS (SELECT 1 FROM #Result WHERE child IS NOT NULL)
            BEGIN
                PRINT 'Step 6: Child Found, Searching for Parent';

                SELECT TOP(1) 
                    @child = child
                FROM #Result;

                -- Search for parent based on the found child
                SELECT TOP(1) 
                    @parent = [parent]
                FROM [AmpRelation].[dbo].[ParentChildRelationship]
                WHERE child = @child
                ORDER BY createdate DESC;

                PRINT 'Parent Found: ' + ISNULL(@parent, 'NULL');

                -- Update the result with the found parent if needed
                IF @parent IS NOT NULL
                BEGIN
                    UPDATE #Result
                    SET parent = @parent
                    WHERE child = @child;

                    PRINT 'Updated Result with Found Parent';
                END
            END
        END
    END

    -- Final validation before returning the result
    IF NOT EXISTS (SELECT 1 FROM #Result)
    BEGIN
        PRINT 'No Result Found, Using Original Serial as BSS_Barcode';

        INSERT INTO #Result (parent, child, BSS_Barcode, mfg_year)
        VALUES (NULL, NULL, @BSS_Barcode, @mfg_year);
    END

    -- Select the final result
    SELECT * FROM #Result;

    PRINT '--- END PROCEDURE ---';

    -- Drop the temporary table
    DROP TABLE #Result;
END