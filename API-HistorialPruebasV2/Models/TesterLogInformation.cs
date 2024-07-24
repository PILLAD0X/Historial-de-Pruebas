namespace API_HistorialPruebasV2.Models
{
    public class TesterLogInformation
    {
       // public string Line { get; set; }
        public char ProductionLine { get; set; }
        public string BarcodeSerialNumber { get; set; }
        public char TestResult { get; set; }
        public DateTime TestDateTime { get; set; }
        public string PartID { get; set; }
        public string CertifiedTestNumber { get; set; }
        public string TestterID { get; set; }
        public string EmployeeNumber { get; set; }
        public Decimal RecordNumber { get; set; }
        public int Box { get; set; }
        public string Pallet { get; set; }
    }
}
