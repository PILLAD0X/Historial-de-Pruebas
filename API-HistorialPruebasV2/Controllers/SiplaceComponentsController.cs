using API_HistorialPruebasV2.models;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;

namespace API_HistorialPruebasV2.Controllers
{
    [ApiController]
    [Route("api/siplacecomponents")]
    public class SiplaceComponentsController : ControllerBase
    {
        private readonly string _connectionString;

        public SiplaceComponentsController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("connection");
        }

        [HttpGet]
        public async Task<IEnumerable<SiplaceComponents>> Get([FromQuery] string serialnumber, [FromQuery] int smtLine)
        {
            List<SiplaceComponents> siplaceComponents = new();

            using (SqlConnection connection = new(_connectionString))
            {
                await connection.OpenAsync();

                using (SqlCommand cmd = new("GetSiplaceComponents", connection))
                {
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;

                    cmd.CommandTimeout = 300; //max wait time to wait for a BD answer.

                    // Adding parameters to the command
                    cmd.Parameters.AddWithValue("@serialnumber", serialnumber);
                    cmd.Parameters.AddWithValue("@SMTLine", smtLine);

                    using (SqlDataReader reader = await cmd.ExecuteReaderAsync())
                    {
                        while (await reader.ReadAsync())
                        {
                           SiplaceComponents components = new()
                           {
                               SmtTraceabilityId = reader["SmtTraceabilityId"] != DBNull.Value ? reader["SmtTraceabilityId"].ToString() : string.Empty,
                               Barcode = reader["Barcode"] != DBNull.Value ? reader["Barcode"].ToString() : string.Empty,
                               TraceDataId = reader["TraceDataId"] != DBNull.Value ? Convert.ToInt32(reader["TraceDataId"]) : 0,
                               LocationId = reader["LocationId"] != DBNull.Value ? Convert.ToInt32(reader["LocationId"]) : 0,
                               PackagingUnitId = reader["PackagingUnitId"] != DBNull.Value ? Convert.ToInt32(reader["PackagingUnitId"]) : 0,
                               Schematic = reader["Schematic"] != DBNull.Value ? reader["Schematic"].ToString() : string.Empty,
                               PackagingUniqueId = reader["PackagingUniqueId"] != DBNull.Value ? reader["PackagingUniqueId"].ToString() : string.Empty,
                               RawComponentBarcode = reader["RawComponentBarcode"] != DBNull.Value ? reader["RawComponentBarcode"].ToString() : string.Empty,
                               LotVendor = reader["LotVendor"] != DBNull.Value ? reader["LotVendor"].ToString() : string.Empty,
                               Supplier = reader["Supplier"] != DBNull.Value ? reader["Supplier"].ToString() : string.Empty,
                               FdrNumber = reader["FdrNumber"] != DBNull.Value ? Convert.ToInt32(reader["FdrNumber"]) : 0,
                               FdrSide = reader["FdrSide"] != DBNull.Value ? Convert.ToInt32(reader["FdrSide"]) : 0,
                               BoardSide = reader["BoardSide"] != DBNull.Value ? Convert.ToChar(reader["BoardSide"]): char.MinValue,
                               BeginDate = reader["BeginDate"] != DBNull.Value ? Convert.ToDateTime(reader["BeginDate"]) : DateTime.MinValue,
                               EndDate = reader["EndDate"] != DBNull.Value ? Convert.ToDateTime(reader["EndDate"]) : DateTime.MinValue

                           };
                            siplaceComponents.Add(components);
                        }
                    }
                }
            }
            return siplaceComponents;
        }
    }
}
