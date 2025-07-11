﻿using Dapper;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using API_HistorialPruebas.Models;
 
namespace API_HistorialPruebas.Controllers
{

   [Route("api/Historial")]
     [ApiController]
     public class TesterLogInformationController : Controller
     {
         private readonly IConfiguration _config;

         public TesterLogInformationController(IConfiguration config)
         {
             _config = config;
         }
         [HttpGet("{serialNumber}")]
         public async Task<ActionResult<TesterLogInformation>> GetTestHistory(string serialNumber, int MfgYear)
         {
            try
            {  
                    
                using var connection = new SqlConnection(_config.GetConnectionString("DefaultConnection"));

                connection.Open();
                    var testHistory = await connection.QueryAsync<TesterLogInformation>
                        ("EXEC [dbo].[getTestHistory] @numSerie = @serialNumber, @year = @MfgYear ",
                            new { serialNumber = serialNumber, MfgYear = MfgYear }, commandTimeout: 300000);

                    if (testHistory.Count() == 0)
                    {
                        //Console.WriteLine("Resultados, valor vacio ");
                        return Ok("NO EXISTEN DATOS");
                    }
                    else { return Ok(testHistory); }
                connection.Close();

            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
  
         }
     }
}
