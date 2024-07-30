namespace API_HistorialPruebasV2.models
{
    public class PanasonicComponents
    {
        public int SmtTraceabilityPanasonicId { get; set; }
        public string Barcode { get; set; }
        public string SerialNo { get; set; }
        public int ReelId { get; set; }
        public string PartNo { get; set; }
        public string VendorNo { get; set; }
        public string LotNo { get; set; }
        public string ReelBarcode { get; set; }
        public DateTime CreateTime { get; set; }

    }
}