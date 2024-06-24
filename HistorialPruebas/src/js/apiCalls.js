import axios from "axios";
import Swal from "sweetalert2";
import Swal1 from "sweetalert";
import {setLoadingFAData, setLoadingPCBData } from './loadingState'
import { getTestHistory } from "./testHistory";
import ParseSerialNumberTo23 from "./parseSerialNumber";
import getMFGYear15LengthCodes from './MFGYear15LengthCodes'

// Aquí declaramos la variable server y la obtenemos de las variables de entorno
const server = process.env.REACT_APP_SERVER_URL;

export const getParentChild = async (serialNumber, setParentChild, setMfgYear, setdetalle70Barcode, setPruebasCodigoNoIdentif, setPruebasFA, setPruebasPCB) => {
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
            const response = await axios.get(`${server}/api/ParentChildRelation?serialNumber=${serialNumber}`);
           // console.log(`${server}/api/ParentChildRelation?serialNumber=${serialNumber}`);

            if (response.data.length === 0) {// When parent-child relationship don't exist.
                console.log(response);
               // console.log(response.data.length);
                setParentChild('No se encontro una relacion entre Parent y Child');

                //"success", "error", "warning", "info"
                Swal.fire({
                    position: "center",
                    icon: "warning",
                    title: "No se encontro una relacion entre amplificador y PCB",
                    showConfirmButton: false,
                    timer: 1400
                });
                setLoadingPCBData(false);
                if (serialNumber.length === 15) { // WHEN AN AMPLIFIER HASN'T A PARENT-CHILD RELATIONSHIP
                   

                     getMFGYear15LengthCodes().then(MFGYidentifier => { // we start the popup that require mfgyear
                        if (MFGYidentifier) {
                          getTestHistory(serialNumber, MFGYidentifier, "FA", {setPruebasCodigoNoIdentif, setPruebasFA, setPruebasPCB} );
                          console.log("FA");
                        } else {
                         
                          Swal.fire({
                                position: "center",
                                icon: "error",
                                text: "No se seleccionó ningún año de manufactura.",
                                showConfirmButton: true,
                                timer: 2000
                            });
                            setLoadingFAData(false);
                        }
                      }).catch(error => {
                        console.error("Error obteniendo el año de manufactura:", error);
                      });

                } else if (serialNumber.length > 15) { //When the serial number  haven't parent -child relation and is longer that 15 characters

                    if (serialNumber.length === 23) { //if the serial number is in format 23 start the search process.


                        const mfgYear = serialNumber.substr(1, 1);
                        getTestHistory(serialNumber, mfgYear, "NA", {setPruebasCodigoNoIdentif, setPruebasFA, setPruebasPCB});
                        console.log("NA");
                    } else {
                        console.log("TODOS LOS OTROS CASOS");
                        console.log('GM CODE WITHOUT GENIE RELATIONSHIP')
                        let detail70serial = JSON.parse(ParseSerialNumberTo23(serialNumber))
                        console.log(detail70serial);
                        setdetalle70Barcode(detail70serial);
                        const mfgYear = detail70serial.code23.substr(1, 1);// serialNumber.substr(1,1);
                        setLoadingFAData();
                        getTestHistory(detail70serial.code23, mfgYear, "FA", {setPruebasCodigoNoIdentif, setPruebasFA, setPruebasPCB});
                        console.log("FA");
                    }
                }
            // } else { //When the parent-child relationship exist.
            //   //  console.log(response.data[0]);
            //     setParentChild(response.data[0]);
            //     setMfgYear(response.data[0].mfgYear); //// PARA QUE SE USA EL MFG YEAR ??

            //     getTestHistory(response.data[0].child, response.data[0].mfg_year, "PCB", {setPruebasCodigoNoIdentif, setPruebasFA, setPruebasPCB});
            //    // console.log("PCB");

            //     if (response.data[0].parent.length === 15 || response.data[0].parent.length === 23) {//IF the parent serial lenght is equal to 15 or 23 we do this. 
                   
            //         getTestHistory(response.data[0].parent, response.data[0].mfg_year, "FA", {setPruebasCodigoNoIdentif, setPruebasFA, setPruebasPCB});
            //       //  console.log("FA");
            //     } else if (response.data[0].parent.length > 23) { //If the 

            //        // console.log(response.data[0].parent)
            //         //console.log(response.data[0].parent.length)

            //         let detail70serial = JSON.parse(ParseSerialNumberTo23(response.data[0].parent));

            //         setdetalle70Barcode(detail70serial);

            //         console.log(detail70serial);
            //         const mfgYear = detail70serial.code23.substr(1, 1);// serialNumber.substr(1,1)

            //         getTestHistory(detail70serial.code23, mfgYear, "FA", {setPruebasCodigoNoIdentif, setPruebasFA, setPruebasPCB});
            //        // console.log("FA");
            //     }
            // }
            }else { //When the parent-child relationship exist.
                //  console.log(response.data[0]);
                  setParentChild(response.data[0]);
                  setMfgYear(response.data[0].mfgYear); //// PARA QUE SE USA EL MFG YEAR ??
  
                  getTestHistory(response.data[0].child, response.data[0].mfg_year, "PCB", {setPruebasCodigoNoIdentif, setPruebasFA, setPruebasPCB});
                 // console.log("PCB");
  
                  if (response.data[0].parent.length === 15 || response.data[0].parent.length === 23) {//IF the parent serial lenght is equal to 15 or 23 we do this. 
                     
                      getTestHistory(response.data[0].parent, response.data[0].mfg_year, "FA", {setPruebasCodigoNoIdentif, setPruebasFA, setPruebasPCB});
                    //  console.log("FA");
                  } else if (response.data[0].parent.length > 23) { //If the 
  
                     // console.log(response.data[0].parent)
                      //console.log(response.data[0].parent.length)
  
                      let detail70serial = JSON.parse(ParseSerialNumberTo23(response.data[0].parent));
  
                      setdetalle70Barcode(detail70serial);
  
                      console.log(detail70serial);
                      const mfgYear = detail70serial.code23.substr(1, 1);// serialNumber.substr(1,1)
  
                      getTestHistory(detail70serial.code23, mfgYear, "FA", {setPruebasCodigoNoIdentif, setPruebasFA, setPruebasPCB});
                     // console.log("FA");
                  }
              }

        } catch (error) {

            console.log(error);
            setLoadingFAData(false);
            setLoadingPCBData(false);
            throw error;

        }
    } else {
        setLoadingPCBData(false);
        setLoadingFAData(false);

        /*Swal.fire({
            position: "center",
            icon: "warning",
            text: "El codigo ingresado no cumple con la longitud estandar, la logitud estandar permitida para las series es de: 15, 23, 36, 43, 45, 55, 70 caracteres.",
            showConfirmButton: true,
            timer: 2000
        });
        */
        Swal1("ATENCION!", "El numero de serie ingresado no cumple con la longitud estandar, la logitud estandar permitida para una serie es de: 15, 23, 36, 43, 45, 55 ó 70 caracteres.", "error")
    }
};



//PENDIENTE EN CASO DE QUE SE UTILICE UN CODIGO QUE 15 Y ESTE NO ENCUENTRE PRUEBAS USARLO PARA BUSCAR EN EL GM PARA INTENTAR UBICAR EL CODIGO DE 70 Y buscar con el de 15

