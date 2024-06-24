using Dapper;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using API_HistorialPruebas.Models;
 
namespace API_HistorialPruebas.Controllers
{
   [Route("api/GMSeries")]
    [ApiController]
    public class GMBarcodeController : Controller
    {
        private readonly IConfiguration _config;
        public GMBarcodeController(IConfiguration config)
        {
            _config = config;
        }
        [HttpGet("{serialNumber}")]
        public async Task<ActionResult<TesterLogInformation>> GetGMSeries(string serialNumber)
        {
            try
            {

                using var connection = new SqlConnection(_config.GetConnectionString("DefaultConnection"));

                connection.Open();
                    var GMSeries = await connection.QueryAsync<GMBarcode>
                        ("EXEC [dbo].[getGM1523serials] @serialNumber = @serialNumber",
                            new { serialNumber = serialNumber }, commandTimeout: 300000);

                    if (GMSeries.Count() == 0)
                    {
                        //Console.WriteLine("Resultados, valor vacio ");
                        return Ok("NO EXISTEN DATOS");
                    }
                    else { return Ok(GMSeries); }
                connection.Close();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}
