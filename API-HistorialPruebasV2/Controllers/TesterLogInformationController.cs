using API_HistorialPruebasV2.Models;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;

namespace API_HistorialPruebasV2.Controllers
{
    [ApiController]
    [Route("api/Historial")]
    public class TesterLogInformationController : ControllerBase
    {
        private readonly string _connectionString;

        public TesterLogInformationController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("connection");
        }

        [HttpGet]
        public async Task<IEnumerable<TesterLogInformation>> Get([FromQuery] string numSerie, [FromQuery] string year)
        {
            List<TesterLogInformation> testerLogInformation = new();

            using (SqlConnection connection = new(_connectionString))
            {
                await connection.OpenAsync();

                using (SqlCommand cmd = new("getTestHistoryv2", connection))
                {
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;

                    cmd.CommandTimeout = 300; //max wait time to wait for a BD answer.
                    // Adding parameters to the command
                    cmd.Parameters.AddWithValue("@numSerie", numSerie);
                    cmd.Parameters.AddWithValue("@year", year);

                    using (SqlDataReader reader = await cmd.ExecuteReaderAsync())
                    {
                        while (await reader.ReadAsync())
                        {
                            TesterLogInformation test = new()
                            {
                                Line = reader["Line"] != DBNull.Value ? reader["Line"].ToString() : string.Empty,
                                ProductionLine = reader["ProductionLine"] != DBNull.Value ? Convert.ToChar(reader["ProductionLine"]) : '\0',
                                BarcodeSerialNumber = reader["BarcodeSerialNumber"] != DBNull.Value ? reader["BarcodeSerialNumber"].ToString() : string.Empty,
                                TestResult = reader["TestResult"] != DBNull.Value ? Convert.ToChar(reader["TestResult"]) : '\0',
                                TestDateTime = reader["TestDateTime"] != DBNull.Value ? Convert.ToDateTime(reader["TestDateTime"]) : DateTime.MinValue,
                                PartID = reader["PartID"] != DBNull.Value ? reader["PartID"].ToString() : string.Empty,
                                CertifiedTestNumber = reader["CertifiedTestNumber"] != DBNull.Value ? reader["CertifiedTestNumber"].ToString() : string.Empty,
                                TestterID = reader["TestterID"] != DBNull.Value ? reader["TestterID"].ToString() : string.Empty,
                                EmployeeNumber = reader["EmployeeNumber"] != DBNull.Value ? reader["EmployeeNumber"].ToString() : string.Empty,
                                RecordNumber = reader["RecordNumber"] != DBNull.Value ? Convert.ToInt32(reader["RecordNumber"]) : 0,
                                Box = reader["Box"] != DBNull.Value ? Convert.ToInt32(reader["Box"]) : 0,
                                Pallet = reader["Pallet"] != DBNull.Value ? reader["Pallet"].ToString() : string.Empty
                            };
                            testerLogInformation.Add(test);
                        }
                    }
                }
            }
            return testerLogInformation;
        }
    }
}
