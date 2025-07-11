USE CTRv2
go
CREATE PROCEDURE [dbo].[getGenieRelationship]
  @serialNumber varchar(90)
  AS
  BEGIN
	SELECT SELECT TOP(1)[parent],[child], Right(YEAR(event_dt),1) AS mfg_year FROM [genie].[dbo].[genie] where parent = @serialNumber OR child = @serialNumber
  END

  
CREATE INDEX IDX_Genie_parent ON Genie(parent);
CREATE INDEX IDX_Genie_child ON Genie(child);