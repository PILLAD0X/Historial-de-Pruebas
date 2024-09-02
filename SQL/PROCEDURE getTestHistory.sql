USE [CTRv2]
GO
/****** Object:  StoredProcedure [dbo].[getTestHistory]    Script Date: 6/21/2024 8:20:18 AM ******/
 --Created by JULIO PILLADO.
CREATE PROCEDURE getTestHistory(
	@year int,
	@numSerie varchar(25)
)
AS
BEGIN
		IF(@year = 0)
		BEGIN
			SELECT * FROM TesterLogInformationArchive_2020  WITH (NOLOCK) WHERE BarcodeSerialNumber=@numSerie
		END
	ELSE IF(@year = 1)
		BEGIN
		   SELECT * FROM TesterLogInformationArchive_2021 WITH (NOLOCK) WHERE BarcodeSerialNumber=@numSerie
		END
	ELSE IF(@year = 2)
		BEGIN
			SELECT * FROM TesterLogInformationArchive_2022 WITH (NOLOCK) WHERE BarcodeSerialNumber=@numSerie UNION 
			SELECT * FROM TesterLogInformationArchive  WITH (NOLOCK) WHERE BarcodeSerialNumber=@numSerie UNION 
			SELECT * FROM [CTRTemporal].[dbo].[TesterLogInformationArchive_2012] WITH (NOLOCK) WHERE BarcodeSerialNumber=@numSerie
		END
	ELSE IF(@year = 3)
		BEGIN
			SELECT * FROM [CTRv2].[dbo].[TesterLogInformationArchive_2023] WITH (NOLOCK) WHERE BarcodeSerialNumber = @numSerie UNION
			SELECT * FROM [CTRTemporal].[dbo].[TesterLogInformationArchive_2013] WITH (NOLOCK) WHERE BarcodeSerialNumber=@numSerie
		END
	ELSE IF(@year = 4)
		BEGIN
			SELECT * FROM TesterLogInformationArchive WITH (NOLOCK) WHERE BarcodeSerialNumber=@numSerie UNION 
			SELECT * FROM [CTRTemporal].[dbo].[TesterLogInformationArchive_2014] WITH (NOLOCK) WHERE BarcodeSerialNumber=@numSerie
		END
	ELSE IF(@year = 5)
		BEGIN
			SELECT * FROM [CTRTemporal].[dbo].[TesterLogInformationArchive_2015] WITH (NOLOCK) WHERE BarcodeSerialNumber=@numSerie
		END
	ELSE IF(@year = 6)
		BEGIN
			SELECT * FROM [CTRTemporal].[dbo].[TesterLogInformationArchive_2016] WITH (NOLOCK) WHERE BarcodeSerialNumber=@numSerie UNION
			SELECT * FROM [CTRTemporal].[dbo].[TesterLogInformation] WITH (NOLOCK) WHERE BarcodeSerialNumber=@numSerie UNION
			SELECT * FROM [CTRTemporal].[dbo].[TesterLogInformationArchive] WITH (NOLOCK) WHERE BarcodeSerialNumber=@numSerie
		END
	ELSE IF(@year = 7)
		BEGIN
			SELECT * FROM [CTRTemporal].[dbo].[TesterLogInformationArchive_2017] WITH (NOLOCK) WHERE BarcodeSerialNumber=@numSerie
		END
	ELSE IF(@year = 8)
		BEGIN
			SELECT * FROM TesterLogInformationArchive_2018  WITH (NOLOCK) WHERE BarcodeSerialNumber=@numSerie
		END
	ELSE IF(@year = 9)
		BEGIN
			SELECT * FROM [CTRv2].[dbo].[TesterLogInformationArchive_2019] WITH (NOLOCK) WHERE BarcodeSerialNumber = @numSerie
		END
	ELSE
		BEGIN
			PRINT('NO EXISTEN DATOS')
		END
END
