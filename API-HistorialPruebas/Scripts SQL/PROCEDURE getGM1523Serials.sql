CREATE PROCEDURE getGM1523serials
    @serialNumber varchar(15)
AS
BEGIN
    SET NOCOUNT ON;

    WITH AllBarcodes AS (
        SELECT [23DigitBarcode], [15DigitBarcode], GMBigBarcode FROM GM_Barcode_Log WITH (NOLOCK) WHERE [15DigitBarcode] = @serialNumber
        UNION ALL
        SELECT [23DigitBarcode], [15DigitBarcode], GMBigBarcode FROM GM_Barcode_Log_Archive_2023 WITH (NOLOCK) WHERE [15DigitBarcode] = @serialNumber
        UNION ALL
        SELECT [23DigitBarcode], [15DigitBarcode], GMBigBarcode FROM GM_Barcode_Log_Archive_2022 WITH (NOLOCK) WHERE [15DigitBarcode] = @serialNumber
        UNION ALL
        SELECT [23DigitBarcode], [15DigitBarcode], GMBigBarcode FROM GM_Barcode_Log_Archive_2021 WITH (NOLOCK) WHERE [15DigitBarcode] = @serialNumber
        UNION ALL
        SELECT [23DigitBarcode], [15DigitBarcode], GMBigBarcode FROM GM_Barcode_Log_Archive_2020 WITH (NOLOCK) WHERE [15DigitBarcode] = @serialNumber
        UNION ALL
        SELECT [23DigitBarcode], [15DigitBarcode], GMBigBarcode FROM GM_Barcode_Log_Archive_2019 WITH (NOLOCK) WHERE [15DigitBarcode] = @serialNumber
        UNION ALL
        SELECT [23DigitBarcode], [15DigitBarcode], GMBigBarcode FROM GM_Barcode_Log_Archive_2018 WITH (NOLOCK) WHERE [15DigitBarcode] = @serialNumber
    )
    SELECT TOP (1) [23DigitBarcode], [15DigitBarcode], GMBigBarcode
    FROM AllBarcodes;

END
GO
CREATE INDEX IDX_15DigitBarcode ON GM_Barcode_Log([15DigitBarcode]);
CREATE INDEX IDX_15DigitBarcode_Archive_2023 ON GM_Barcode_Log_Archive_2023([15DigitBarcode]);
CREATE INDEX IDX_15DigitBarcode_Archive_2022 ON GM_Barcode_Log_Archive_2022([15DigitBarcode]);
CREATE INDEX IDX_15DigitBarcode_Archive_2021 ON GM_Barcode_Log_Archive_2021([15DigitBarcode]);
CREATE INDEX IDX_15DigitBarcode_Archive_2020 ON GM_Barcode_Log_Archive_2020([15DigitBarcode]);
CREATE INDEX IDX_15DigitBarcode_Archive_2019 ON GM_Barcode_Log_Archive_2019([15DigitBarcode]);
CREATE INDEX IDX_15DigitBarcode_Archive_2018 ON GM_Barcode_Log_Archive_2018([15DigitBarcode]);
