using Dapper;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using API_HistorialPruebas.Models;
 
namespace API_HistorialPruebas.Controllers
{
    [Route("api/ParentChildRelation")]
    [ApiController]
    public class GenieController : Controller
    {
        ParseoCodigo parsear = new ParseoCodigo();
        private readonly IConfiguration _config;

        public GenieController(IConfiguration config)
        {
            _config = config;
        }
        [HttpGet("{barcode}")]
        public async Task<ActionResult<Genie>> GetRelationParentChild(string barcode)
        {
            try
            {
                var codigoParseado = parsear.validarLongitud(barcode);
                using var connection = new SqlConnection(_config.GetConnectionString("DefaultConnection"));
                connection.Open();
                    var relacionParentChild = await connection.QueryAsync<Genie>
                        ("SELECT [parent],[child], Right(YEAR(event_dt),1) AS mfg_year FROM [MXTJMFGSQLCTR\\CTR].[Genie].[dbo].[genie] where parent = @CodigoParseado OR child = @CodigoParseado",
                            new { CodigoParseado = codigoParseado });
                    if(relacionParentChild.Count() == 0)
                    {
                        return Ok("No se encontro una relacion entre Parent y Child");
                    }
                    else
                    {
                        return Ok(relacionParentChild);
                    }
                connection.Close();
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }

        }
    }
}
