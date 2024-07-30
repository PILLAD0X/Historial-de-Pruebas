using API_HistorialPruebasV2.models;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;

namespace API_HistorialPruebasV2.Controllers
{
    [ApiController]
    [Route("api/THTcomponents")]
    public class THTComponentsController : ControllerBase
    {
        private readonly string _connectionString;

        public THTComponentsController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("connection");
        }

        [HttpGet]
        public async Task<IEnumerable<THTComponents>> Get([FromQuery] string serialnumber, [FromQuery] string mfgYear) // valores que se recibiran en la llamada al API
        {
            List<THTComponents> thtComponents = new();

            using (SqlConnection connection = new(_connectionString))
            {
                await connection.OpenAsync();

                using (SqlCommand cmd = new("GetTHTComponents", connection))
                {
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;

                    cmd.CommandTimeout = 300; //max wait time to wait for a BD answer.

                    // Adding parameters to the command
                    cmd.Parameters.AddWithValue("@serialnumber", serialnumber);
                    cmd.Parameters.AddWithValue("@year", mfgYear);

                    using (SqlDataReader reader = await cmd.ExecuteReaderAsync())
                    {
                        while (await reader.ReadAsync())
                        {
                            THTComponents components = new()
                            {
                                idHistory = reader["idHistory"] != DBNull.Value ? Convert.ToInt32(reader["idHistory"]) : 0,
                                SerialNumber = reader["SerialNumber"] != DBNull.Value ? reader["SerialNumber"].ToString() : string.Empty,
                                MID = reader["MID"] != DBNull.Value ? reader["MID"].ToString() : string.Empty,
                                Lot_vendor = reader["Lot_vendor"] != DBNull.Value ? reader["Lot_vendor"].ToString() : string.Empty,
                                PartNumber = reader["PartNumber"] != DBNull.Value ? reader["PartNumber"].ToString() : string.Empty,
                                Linea = reader["Linea"] != DBNull.Value ? reader["Linea"].ToString() : string.Empty,
                                TimeSpan = reader["TimeSpan"] != DBNull.Value ? Convert.ToDateTime(reader["TimeSpan"]) : DateTime.MinValue
                            };
                            thtComponents.Add(components);
                        }
                    }
                }
                connection.CloseAsync();
            }
            return thtComponents;
        }
    }
}
