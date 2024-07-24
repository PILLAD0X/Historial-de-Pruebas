using API_HistorialPruebasV2.models;
using API_HistorialPruebasV2.Models;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;

namespace API_HistorialPruebasV2.Controllers
{
    [ApiController]
    [Route("api/PcbRelation")]
    public class PcbRelationController : ControllerBase
    {
        private readonly string _connectionString;

        public PcbRelationController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("connection");
        }

        [HttpGet]
        public async Task<IEnumerable<PcbRelation>> Get([FromQuery] string serialP1, [FromQuery] string serialP2, [FromQuery] string year)
        {
            List<PcbRelation> pcbRelations = new();

            using (SqlConnection connection = new(_connectionString))
            {
                await connection.OpenAsync();

                using (SqlCommand cmd = new("getPCBRelation", connection))
                {
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;

                    cmd.CommandTimeout = 300; //max wait time to wait for a BD answer.

                    // Adding parameters to the command
                    cmd.Parameters.AddWithValue("@serialP1", serialP1);
                    cmd.Parameters.AddWithValue("@serialP2", serialP2);
                    cmd.Parameters.AddWithValue("@year", year);

                    using (SqlDataReader reader = await cmd.ExecuteReaderAsync())
                    {
                        while (await reader.ReadAsync())
                        {
                            PcbRelation topBottomRelation = new()
                            {
                                TSS_Barcode = reader["TSS_Barcode"] != DBNull.Value ? reader["TSS_Barcode"].ToString() : string.Empty,
                                BSS_Barcode = reader["BSS_Barcode"] != DBNull.Value ? reader["BSS_Barcode"].ToString() : string.Empty,
                            };
                            pcbRelations.Add(topBottomRelation);
                        }
                    }
                }
                connection.CloseAsync();
            }
            return pcbRelations;
        }
    }
}
