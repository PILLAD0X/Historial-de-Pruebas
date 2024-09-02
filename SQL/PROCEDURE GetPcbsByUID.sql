 --Created by JULIO PILLADO.
 --APP Test History 8/5/2024.
CREATE PROCEDURE GetPcbsByUID(
    @UID NVARCHAR(255),  
	@Material NVARCHAR(255)
)
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @Result TABLE (Barcode NVARCHAR(255));  -- Tabla temporal para almacenar resultados

    INSERT INTO @Result
    SELECT Barcode
    FROM [USVAMEISMX-P1].[LHEE_ASE13TRACE].[trc].[SmtTraceabilitySiplace] WITH (NOLOCK)
    WHERE PackagingUniqueId = @UID AND RawComponentBarcode = @Material
    GROUP BY Barcode

    UNION ALL

    SELECT Barcode
    FROM [USVAMEISMX-P1].[LHEE_ASE5TRACE].[trc].[SmtTraceabilitySiplace] WITH (NOLOCK)
    WHERE PackagingUniqueId = @UID AND RawComponentBarcode = @Material
    GROUP BY Barcode

    UNION ALL

    SELECT Barcode
    FROM [USVAMEISMX-P1].[LHEE_ASE7TRACE].[trc].[SmtTraceabilitySiplace] WITH (NOLOCK)
    WHERE PackagingUniqueId = @UID AND RawComponentBarcode = @Material
    GROUP BY Barcode

    UNION ALL

    SELECT Barcode
    FROM [USVAMEISMX-P1].[LHEE_ASE8TRACE].[trc].[SmtTraceabilitySiplace] WITH (NOLOCK)
    WHERE PackagingUniqueId = @UID AND RawComponentBarcode = @Material
    GROUP BY Barcode

    UNION ALL

    SELECT Barcode
    FROM [USVAMEISMX-P1].[LHEE_ASE9TRACE].[trc].[SmtTraceabilitySiplace] WITH (NOLOCK)
    WHERE PackagingUniqueId = @UID AND RawComponentBarcode = @Material
    GROUP BY Barcode

    UNION ALL

    SELECT Barcode
    FROM [USVAMEISMX-P1].[LHEE_CE11TRACE].[trc].[SmtTraceabilitySiplace] WITH (NOLOCK)
    WHERE PackagingUniqueId = @UID AND RawComponentBarcode = @Material
    GROUP BY Barcode

    UNION ALL

    SELECT Barcode
    FROM [USVAMEISMX-P1].[LHEE_CE12TRACE].[trc].[SmtTraceabilitySiplace] WITH (NOLOCK)
    WHERE PackagingUniqueId = @UID AND RawComponentBarcode = @Material
    GROUP BY Barcode

    UNION ALL

    SELECT Barcode
    FROM [USVAMEISMX-P1].[LHEE_CIE1TRACE].[trc].[SmtTraceabilitySiplace] WITH (NOLOCK)
    WHERE PackagingUniqueId = @UID AND RawComponentBarcode = @Material
    GROUP BY Barcode

    UNION ALL

    SELECT Barcode
    FROM [USVAMEISMX-P1].[AsdTrace].[trc].[SmtTraceabilityPanasonic]
    WHERE ReelBarcode = @UID AND PartNo = @Material
    GROUP BY Barcode;

    -- Devolver los resultados
    SELECT Barcode FROM @Result;
END;
