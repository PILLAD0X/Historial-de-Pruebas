const ParseSerialNumberTo23 = (originalSerialNumber) =>{
    const serialNumberwithOutCharacters = originalSerialNumber.split("#").join(''); 
    if (serialNumberwithOutCharacters.length === 15) {
        return serialNumberwithOutCharacters;
    } else if (serialNumberwithOutCharacters.length === 23) {
        return serialNumberwithOutCharacters;
    } else if (serialNumberwithOutCharacters.length === 36) {
        let code36ParseTo23 = serialNumberwithOutCharacters.substring(12, 24);
        return code36ParseTo23;
    } else if (serialNumberwithOutCharacters.length === 43) {
        let code43ParseTo23 = serialNumberwithOutCharacters.substring(20, 23);
        return code43ParseTo23;
    } else if (serialNumberwithOutCharacters.length === 45) {
        let code45ParseTo23 = serialNumberwithOutCharacters.substring(22, 23);
        return code45ParseTo23;
    } else if (serialNumberwithOutCharacters.length === 55) {
        let code55ParseTo23 = serialNumberwithOutCharacters.substring(32, 23);
        return code55ParseTo23;
    } else if (serialNumberwithOutCharacters.length === 70) {
        let Plant = "F";
        let YEARandJulianD = serialNumberwithOutCharacters.substring(45, 49);
        let Sequense = serialNumberwithOutCharacters.substring(51, 55);
        let Hour = ConvertNumberToAlphabet(serialNumberwithOutCharacters.substring(55, 57));
        let ProductionLine = serialNumberwithOutCharacters.substring(57, 58);
        let BosePN = serialNumberwithOutCharacters.substring(60, 66);
        let Revision = "00";
        let ProductionRevision = serialNumberwithOutCharacters.substring(66, 68);
        let PartVariation = serialNumberwithOutCharacters.substring(68, 70);
        let GMCode23 = Plant + YEARandJulianD + Sequense + Hour + ProductionLine + BosePN + Revision + ProductionRevision + PartVariation;
        let GMBarcodeData = {
            code15: ConvertGM70CodeTo15(serialNumberwithOutCharacters),
            code23: GMCode23,
            code70: serialNumberwithOutCharacters
        };
        let jsonGM70CodeToAll = JSON.stringify(GMBarcodeData);
        return jsonGM70CodeToAll;
    } else {
        
    }
}

const ConvertNumberToAlphabet = (number) => {
    switch (number) {
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

const ConvertGM70CodeTo15 = (GMCode70) =>{
    let BosePN = GMCode70.substring(60, 66);
    let Revision = "00";
    let PartVariation = GMCode70.substring(68, 70);
    let Sequense = GMCode70.substring(50, 55);
    let GM15Code = BosePN + Revision + PartVariation + Sequense;
    return GM15Code;
}

const ValidarLongitud = (serialNumber) =>{
    if (serialNumber.length === 70) {
        return serialNumber;
    } else {
        let codigoParseado = this.ParsearCodigo(serialNumber);
        return codigoParseado;
    }
}
export default ParseSerialNumberTo23;