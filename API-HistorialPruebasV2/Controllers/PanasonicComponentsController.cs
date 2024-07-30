using API_HistorialPruebasV2.models;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;

namespace API_HistorialPruebasV2.Controllers
{
    [ApiController]
    [Route("api/PanasonicComponents")]
    public class PanasonicComponentsController : ControllerBase
    {
        private readonly string _connectionString;

        public PanasonicComponentsController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("connection");
        }

        [HttpGet]
        public async Task<IEnumerable<PanasonicComponents>> Get([FromQuery] string serialnumberP1, [FromQuery] string serialnumberP2) // valores que se recibiran en la llamada al API
        {
            List<PanasonicComponents> panasonicComponents = new();

            using (SqlConnection connection = new(_connectionString))
            {
                await connection.OpenAsync();

                using (SqlCommand cmd = new("GetPanasonicComponents", connection))
                {
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;

                    cmd.CommandTimeout = 300; //max wait time to wait for a BD answer.

                    // Adding parameters to the command
                    cmd.Parameters.AddWithValue("@serialnumberP1", serialnumberP1);
                    cmd.Parameters.AddWithValue("@serialnumberP2", serialnumberP2);

                    using (SqlDataReader reader = await cmd.ExecuteReaderAsync())
                    {
                        while (await reader.ReadAsync())
                        {
                            PanasonicComponents components = new()
                            {
                                SmtTraceabilityPanasonicId = reader["SmtTraceabilityPanasonicId"] != DBNull.Value ? Convert.ToInt32(reader["SmtTraceabilityPanasonicId"]) : 0,
                                Barcode = reader["Barcode"] != DBNull.Value ? reader["Barcode"].ToString() : string.Empty,
                                SerialNo = reader["SerialNo"] != DBNull.Value ? reader["SerialNo"].ToString() : string.Empty,
                                ReelId = reader["ReelId"] != DBNull.Value ? Convert.ToInt32(reader["ReelId"]) : 0,
                                PartNo = reader["PartNo"] != DBNull.Value ? reader["PartNo"].ToString() : string.Empty,
                                VendorNo = reader["VendorNo"] != DBNull.Value ? reader["VendorNo"].ToString() : string.Empty,
                                LotNo = reader["LotNo"] != DBNull.Value ? reader["LotNo"].ToString() : string.Empty,
                                ReelBarcode = reader["ReelBarcode"] != DBNull.Value ? reader["ReelBarcode"].ToString() : string.Empty,
                                CreateTime = reader["CreateTime"] != DBNull.Value ? Convert.ToDateTime(reader["CreateTime"]) : DateTime.MinValue
                            };
                            panasonicComponents.Add(components);
                        }
                    }
                }
                connection.CloseAsync();
            }
            return panasonicComponents;
        }
    }
}
