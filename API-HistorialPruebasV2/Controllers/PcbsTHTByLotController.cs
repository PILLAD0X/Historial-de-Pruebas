using API_HistorialPruebasV2.Models;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API_HistorialPruebasV2.Controllers
{
    //[ApiController]
    //[Route("api/PcbsTHTByLot")]
    public class PcbsTHTByLotController : ControllerBase
    {
        private readonly string _connectionString;

        public PcbsTHTByLotController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("connection");
        }

        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] string LotVendor, string Material)
        {
            List<PcbsTHTByLot> pcbsthtbylot = new();

            try
            {
                using (SqlConnection connection = new(_connectionString))
                {
                    await connection.OpenAsync();
                    Console.WriteLine("Database connection opened.");

                    using (SqlCommand cmd = new("GetTHTBarcodesByLotVendor", connection))
                    {
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        cmd.CommandTimeout = 300; //max wait time to wait for a BD answer.

                        // Adding parameters to the command
                        cmd.Parameters.AddWithValue("@Material", Material);
                        cmd.Parameters.AddWithValue("@LotVendor", LotVendor);
                        Console.WriteLine($"Parameters added: Material={Material}, LotVendor={LotVendor}");

                        using (SqlDataReader reader = await cmd.ExecuteReaderAsync())
                        {
                            while (await reader.ReadAsync())
                            {
                                PcbsTHTByLot pcbs = new()
                                {
                                    TSS_Barcode = reader["TSS_Barcode"] != DBNull.Value ? reader["TSS_Barcode"].ToString() : string.Empty,
                                    BSS_Barcode = reader["BSS_Barcode"] != DBNull.Value ? reader["BSS_Barcode"].ToString() : string.Empty
                                };

                                pcbsthtbylot.Add(pcbs);
                                Console.WriteLine($"Data read: TSS_Barcode={pcbs.TSS_Barcode}, BSS_Barcode={pcbs.BSS_Barcode}");
                            }
                        }
                    }
                    await connection.CloseAsync();
                    Console.WriteLine("Database connection closed.");
                }

                if (pcbsthtbylot.Count == 0)
                {
                    return NotFound("No data found.");
                }

                return Ok(pcbsthtbylot);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Exception: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }
    }
}
