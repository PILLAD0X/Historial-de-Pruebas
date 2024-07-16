namespace API_HistorialPruebasV2.models
{
    public class SiplaceComponents
    {
        public string SmtTraceabilityId { get; set; }
        public string Barcode { get; set; }
        public int TraceDataId { get; set; }
        public int LocationId { get; set; }
        public int PackagingUnitId { get; set; }
        public string Schematic { get; set; }
        public string PackagingUniqueId { get; set; }
        public string RawComponentBarcode { get; set; }
        public string LotVendor { get; set; }
        public string Supplier { get; set; }
        public int FdrNumber { get; set; }
        public int FdrSide { get; set; }
        public char BoardSide { get; set; }
        public DateTime BeginDate { get; set; }
        public DateTime EndDate { get; set; }
    }
}