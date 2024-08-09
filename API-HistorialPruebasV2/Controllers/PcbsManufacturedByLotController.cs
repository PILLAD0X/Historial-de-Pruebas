using API_HistorialPruebasV2.models;
using API_HistorialPruebasV2.Models;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;

namespace API_HistorialPruebasV2.Controllers
{
    [ApiController]
    [Route("api/PcbsManufacturedByLot")]
    public class PcbsManufacturedByLotController
    {
       
            private readonly string _connectionString;

            public PcbsManufacturedByLotController(IConfiguration configuration)
            {
                _connectionString = configuration.GetConnectionString("connection");
            }

            [HttpGet]
            public async Task<IEnumerable<PcbsManufacturedByLot>> Get([FromQuery] string lot, string Material)
            {
                List<PcbsManufacturedByLot> pcbsmanufacturedbyLot = new();

                using (SqlConnection connection = new(_connectionString))
                {
                    await connection.OpenAsync();

                    using (SqlCommand cmd = new("GetPcbsByLot", connection))
                    {
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;

                        cmd.CommandTimeout = 1000; //max wait time to wait for a BD answer.

                        // Adding parameters to the command
                        cmd.Parameters.AddWithValue("@lot", lot);
                        cmd.Parameters.AddWithValue("@Material", Material);

                    using (SqlDataReader reader = await cmd.ExecuteReaderAsync())
                        {
                            while (await reader.ReadAsync())
                            {
                                PcbsManufacturedByLot pcbs = new()
                                {
                                    Barcode = reader["Barcode"] != DBNull.Value ? reader["Barcode"].ToString() : string.Empty,
                                };
                                pcbsmanufacturedbyLot.Add(pcbs);
                            }
                        }
                    }
                    connection.CloseAsync();
                }
                return pcbsmanufacturedbyLot;
            }
        
    }
}
