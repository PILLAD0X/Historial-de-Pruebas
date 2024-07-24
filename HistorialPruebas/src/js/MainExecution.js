import Swal from "sweetalert2";
import Swal1 from "sweetalert";
import { GetTestHistory } from "./TestHistory";
import ParseSerialNumberTo23 from "./parseSerialNumber";
import getMFGYear15LengthCodes from './MFGYear15LengthCodes'
import { GetGMSerialRelation } from "./GMSerials";
import { GetParentChildRelation } from "./ParentChildRelations";

// Aquí declaramos la variable server y la obtenemos de las variables de entorno
const server = process.env.REACT_APP_SERVER_URL;

export const MainExecution = async (serialNumber, setParentChild, setdetalle70Barcode, setPruebasCodigoNoIdentif, setPruebasFA, setPruebasPCB, setLoadingPCB, setLoadingFA, parentChild) => {
    //const {setLoadingPCB, setLoadingFA} = useLoading();
    if (
        serialNumber.length === 15 ||
        serialNumber.length === 23 ||
        serialNumber.length === 36 ||
        serialNumber.length === 43 ||
        serialNumber.length === 45 ||
        serialNumber.length === 55 ||
        serialNumber.length === 70
    ) { // the serial number has the right length
        try {
            //GET PARENT-CHILD RELATIONSHIP
            
            const parent_pcb_raltion = await GetParentChildRelation(serialNumber, setParentChild, setLoadingPCB);
            
            if (parent_pcb_raltion === 'No se encontro una relacion entre Parent y Child') {// When parent-child relationship don't exist.

                setParentChild(parent_pcb_raltion);
                if (serialNumber.length === 15) { // WHEN AN AMPLIFIER HASN'T A PARENT-CHILD RELATIONSHIP

                    getMFGYear15LengthCodes().then(async MFGYidentifier => { // we start the popup that require mfgyear
                    if (MFGYidentifier) {
                        

                       var responseTestHistoryF = await GetTestHistory(serialNumber, MFGYidentifier, "GM15Serial", {setPruebasCodigoNoIdentif, setPruebasFA, setPruebasPCB},setLoadingPCB,setLoadingFA);
                        
                       if( responseTestHistoryF === "Could not found test history"){ // if we couldn't get a test history we going to check if we can get GMserial realtio
                            var GM70Serial = await GetGMSerialRelation(serialNumber)
                            if(GM70Serial !== 'End process') {
                                MainExecution(await GM70Serial, setParentChild, setdetalle70Barcode, setPruebasCodigoNoIdentif, setPruebasFA, setPruebasPCB, setLoadingPCB, setLoadingFA)
                            }else{

                                setLoadingFA(false);
                            }
                        }else{

                        }
                        
                    } else {
                        
                        Swal.fire({
                            position: "center",
                            icon: "error",
                            text: "No se seleccionó ningún año de manufactura.",
                            showConfirmButton: true,
                            timer: 2000
                        });
                        setLoadingFA(false);
                    }
                    }).catch(error => {
                        console.error("Error obteniendo el año de manufactura:", error);
                    });

                } else if (serialNumber.length > 15) { //When the serial number  haven't parent -child relation and is longer that 15 characters

                    if (serialNumber.length === 23) { //if the serial number is in format 23 start the search process.


                        const mfgYear = serialNumber.substr(1, 1);
                        GetTestHistory(serialNumber, mfgYear, "NA", {setPruebasCodigoNoIdentif, setPruebasFA, setPruebasPCB},setLoadingPCB, setLoadingFA);
                    } else {
                        let detail70serial = JSON.parse(ParseSerialNumberTo23(serialNumber))
                        setdetalle70Barcode(detail70serial);
                        const mfgYear = detail70serial.code23.substr(1, 1);// serialNumber.substr(1,1);
                       // setLoadingFA(true);
                        GetTestHistory(detail70serial.code23, mfgYear, "FA", {setPruebasCodigoNoIdentif, setPruebasFA, setPruebasPCB}, setLoadingPCB, setLoadingFA);
                    }
                }
            }else { //When the parent-child relationship exist.
                
                GetTestHistory(parent_pcb_raltion.child, parent_pcb_raltion.mfg_year, "PCB", {setPruebasCodigoNoIdentif, setPruebasFA, setPruebasPCB}, setLoadingPCB, setLoadingFA);

                if (parent_pcb_raltion.parent.length === 15 || parent_pcb_raltion.parent.length === 23) {//IF the parent serial lenght is equal to 15 or 23 we do this. 
                    GetTestHistory(parent_pcb_raltion.parent, parent_pcb_raltion.mfg_year, "FA", {setPruebasCodigoNoIdentif, setPruebasFA, setPruebasPCB}, setLoadingPCB, setLoadingFA);
                } else if (parent_pcb_raltion.parent.length > 23) { //If the 
                  let detail70serial = JSON.parse(ParseSerialNumberTo23(parent_pcb_raltion.parent));
                  setdetalle70Barcode(detail70serial);
                  const mfgYear = detail70serial.code23.substr(1, 1);// serialNumber.substr(1,1)
                  GetTestHistory(detail70serial.code23, mfgYear, "FA", {setPruebasCodigoNoIdentif, setPruebasFA, setPruebasPCB}, setLoadingPCB, setLoadingFA);
                }
            }

        } catch (error) {

            console.log(error);
            setLoadingFA(false);
            setLoadingPCB(false);
            throw error;

        }
    } else {
        setLoadingPCB(false);
        setLoadingFA(false);
        Swal1("ATENCION!", "El numero de serie ingresado no cumple con la longitud estandar, la logitud estandar permitida para una serie es de: 15, 23, 36, 43, 45, 55 ó 70 caracteres.", "error")
    }
};



//PENDIENTE EN CASO DE QUE SE UTILICE UN CODIGO QUE 15 Y ESTE NO ENCUENTRE PRUEBAS USARLO PARA BUSCAR EN EL GM PARA INTENTAR UBICAR EL CODIGO DE 70 Y buscar con el de 15
