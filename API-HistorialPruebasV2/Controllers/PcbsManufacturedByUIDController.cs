using API_HistorialPruebasV2.models;
using API_HistorialPruebasV2.Models;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;

namespace API_HistorialPruebasV2.Controllers
{
    [ApiController]
    [Route("api/PcbsManufacturedByUID")]
    public class PcbsManufacturedByUIDController
    {
       
            private readonly string _connectionString;

            public PcbsManufacturedByUIDController(IConfiguration configuration)
            {
                _connectionString = configuration.GetConnectionString("connection");
            }

            [HttpGet]
            public async Task<IEnumerable<PcbsManufacturedByUID>> Get([FromQuery] string UID)
            {
                List<PcbsManufacturedByUID> pcbsmanufacturedbyUIDs = new();

                using (SqlConnection connection = new(_connectionString))
                {
                    await connection.OpenAsync();

                    using (SqlCommand cmd = new("GetPcbsByUID", connection))
                    {
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;

                        cmd.CommandTimeout = 300; //max wait time to wait for a BD answer.

                        // Adding parameters to the command
                        cmd.Parameters.AddWithValue("@UID", UID);

                        using (SqlDataReader reader = await cmd.ExecuteReaderAsync())
                        {
                            while (await reader.ReadAsync())
                            {
                                PcbsManufacturedByUID pcbs = new()
                                {
                                    Barcode = reader["Barcode"] != DBNull.Value ? reader["Barcode"].ToString() : string.Empty,
                                };
                                pcbsmanufacturedbyUIDs.Add(pcbs);
                            }
                        }
                    }
                    connection.CloseAsync();
                }
                return pcbsmanufacturedbyUIDs;
            }
        
    }
}
