using API_HistorialPruebasV2.models;
using API_HistorialPruebasV2.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Threading.Tasks;

namespace API_HistorialPruebasV2.Controllers
{
    [ApiController]
    [Route("api/GMSerials")]
    public class GMBarcodeController : ControllerBase
    {
        private readonly string _connectionString;

        public GMBarcodeController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("connection");
        }

        [HttpGet]
        public async Task<IEnumerable<GMBarcode>> Get([FromQuery] string serialNumber)
        {
            List<GMBarcode> gmBarcode = new();

            using (SqlConnection connection = new(_connectionString))
            {
                await connection.OpenAsync();

                using (SqlCommand cmd = new("getGM1523serials", connection))
                {
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;

                    // Adding parameters to the command
                    cmd.Parameters.AddWithValue("@serialNumber", serialNumber);

                    using (SqlDataReader reader = await cmd.ExecuteReaderAsync())
                    {
                        while (await reader.ReadAsync())
                        {
                            GMBarcode serials = new(){
                                ////PENDIENTE FINALIZAR
                                code15 = reader["15DigitBarcode"] != DBNull.Value ? reader["15DigitBarcode"].ToString() : string.Empty,
                                code23 = reader["23DigitBarcode"] != DBNull.Value ? reader["23DigitBarcode"].ToString() : string.Empty,
                                code70 = reader["GMBigBarcode"] != DBNull.Value ? reader["GMBigBarcode"].ToString() : string.Empty,
                            };
                            gmBarcode.Add(serials);
                        }
                    }
                }
            }

            return gmBarcode;
        }
    }
}
