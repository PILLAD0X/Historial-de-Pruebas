using Dapper;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using API_HistorialPruebas.Models;
 
namespace API_HistorialPruebas.Controllers
{
  /*  [Route("api/GMSeries")]
    [ApiController]
    public class GMBarcodeController : Controller
    {
        private readonly IConfiguration _config;
        public GMBarcodeController(IConfiguration config)
        {
            _config = config;
        }
        [HttpGet("{ProductSerial}")]
        public async Task<ActionResult<TesterLogInformation>> GetGMSeries(string ProductSerial)
        {
            try
            {

                using var connection = new SqlConnection(_config.GetConnectionString("DefaultConnection"));

                connection.Open();
                    var GMSeries = await connection.QueryAsync<GMBarcode>
                        ("EXEC [dbo].[getGMSerial] @numSerieGM = @ProductSerial",
                            new { ProductSerial = ProductSerial }, commandTimeout: 300000);

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
    }*/
}
