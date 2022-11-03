using Microsoft.AspNetCore.Mvc;
// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860
 
namespace API_HistorialPruebas.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ParseoController : ControllerBase
    {
        ParseoCodigo parsear = new ParseoCodigo();
        // GET api/<ParseoController>/5
        [HttpGet("{codigo}")]
        public string Get(string codigo)
        {
            var codigoParseado = parsear.ParsearCodigo(codigo);

            Response.StatusCode = 200;
            return codigoParseado.ToString();
           
        }

    }
}
