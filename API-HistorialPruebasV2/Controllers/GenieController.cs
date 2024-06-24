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
    [Route("api/ParentChildRelation")]
    public class GenieController : ControllerBase
    {
        private readonly string _connectionString;

        public GenieController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("connection");
        }

        [HttpGet]
        public async Task<IEnumerable<Genie>> Get([FromQuery] string serialNumber)
        {
            List<Genie> genie = new();

            using (SqlConnection connection = new(_connectionString))
            {
                await connection.OpenAsync();

                using (SqlCommand cmd = new("getGenieRelationship", connection))
                {   
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;

                    cmd.CommandTimeout = 300; //max wait time to wait for a BD answer.

                    // Adding parameters to the command
                    cmd.Parameters.AddWithValue("@serialNumber", serialNumber);

                    using (SqlDataReader reader = await cmd.ExecuteReaderAsync())
                    {
                        while (await reader.ReadAsync())
                        {
                            Genie relation = new(){
                                parent = reader["parent"] != DBNull.Value ? reader["parent"].ToString() : string.Empty,
                                child = reader["child"] != DBNull.Value ? reader["child"].ToString() : string.Empty,
                                mfg_year = reader["mfg_year"] != DBNull.Value ? Convert.ToInt32(reader["mfg_year"]) : 0,
                            };
                            genie.Add(relation);
                        }
                    }
                }
            }
            return genie;
        }
    }
}
