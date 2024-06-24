using API_HistorialPruebas.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Text.Json;
using System.Text.Json.Serialization;
namespace API_HistorialPruebas.Controllers
{
    public class ParseoCodigo
    {
        public string ParsearCodigo(string barcode)
        {
            if (barcode.Length == 15)
            {

                return barcode;

            }
            else if (barcode.Length == 23)
            {
                return barcode;
            }
            else if (barcode.Length == 36)
            {
                string code36ParseTo23 = barcode.Substring(12, 24);
                return code36ParseTo23;
            }
            else if (barcode.Length == 43)
            {
                string code43ParseTo23 = barcode.Substring(20, 23);
                return code43ParseTo23;
            }
            else if (barcode.Length == 45)
            {
                string code45ParseTo23 = barcode.Substring(22, 23);
                return code45ParseTo23;
            }
            else if (barcode.Length == 55)
            {
                string code55ParseTo23 = barcode.Substring(32, 23);
                return code55ParseTo23;
            }
            else if (barcode.Length == 70)
            {
                string Plant = "F";
                string YEARandJulianD = barcode.Substring(45, 4);
                string Sequense = barcode.Substring(51, 4);
                string Hour = ConvertNumberToAlphabet(barcode.Substring(55, 2));
                string ProductionLine = barcode.Substring(57, 1);
                string BosePN = barcode.Substring(60, 6);
                string Revision = "00";
                string ProductionRevision = barcode.Substring(66, 2);
                string PartVariation = barcode.Substring(68, 2);
                string GMCode23 = Plant + YEARandJulianD + Sequense + Hour + ProductionLine + BosePN + Revision + ProductionRevision + PartVariation;
                var GMBarcodeData = new GMBarcode
                {
                    code15 = ConvertGM70CodeTo15(barcode),
                    code23 = GMCode23,
                    code70 = barcode.ToString()
                };

                string jsonGM70CodeToAll = JsonSerializer.Serialize(GMBarcodeData);
                return jsonGM70CodeToAll;
            }
            else
            {
                return "El codigo ingresado no cumple con la longitud estandar, la logitud estandar permitida para las series es: 15, 23, 36, 43, 45, 55, 70";
            }

        }

        private string ConvertNumberToAlphabet(string number)
        {
            switch (number)
            {
                case "00":
                    number = "A";
                    break;
                case "01":
                    number = "B";
                    break;
                case "02":
                    number = "C";
                    break;
                case "03":
                    number = "D";
                    break;
                case "04":
                    number = "E";
                    break;
                case "05":
                    number = "F";
                    break;
                case "06":
                    number = "G";
                    break;
                case "07":
                    number = "H";
                    break;
                case "08":
                    number = "I";
                    break;
                case "09":
                    number = "J";
                    break;
                case "10":
                    number = "K";
                    break;
                case "11":
                    number = "L";
                    break;
                case "12":
                    number = "M";
                    break;
                case "13":
                    number = "N";
                    break;
                case "14":
                    number = "O";
                    break;
                case "15":
                    number = "P";
                    break;
                case "16":
                    number = "Q";
                    break;
                case "17":
                    number = "R";
                    break;
                case "18":
                    number = "S";
                    break;
                case "19":
                    number = "T";
                    break;
                case "20":
                    number = "U";
                    break;
                case "21":
                    number = "V";
                    break;
                case "22":
                    number = "W";
                    break;
                case "23":
                    number = "X";
                    break;
                case "24":
                    number = "Y";
                    break;
                case "25":
                    number = "Z";
                    break;
            }
            return number;
        }

        private string ConvertGM70CodeTo15(string GMCode70)
        {
            string BosePN = GMCode70.Substring(60, 6);
            string Revision = "00";
            string PartVariation = GMCode70.Substring(68, 2);
            string Sequense = GMCode70.Substring(50, 5);
            string GM15Code = BosePN + Revision + PartVariation + Sequense;
            return GM15Code;
        }

        public string validarLongitud(string barcode)
        {
            if (barcode.Length == 70)
            {
                return barcode;
            }
            else
            {
                var codigoParseado = ParsearCodigo(barcode);
                return codigoParseado;
            }
        }
    }

}
//BY:Julio Pillado.