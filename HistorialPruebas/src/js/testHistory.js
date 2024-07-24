import Swal from "sweetalert2";
import axios from "axios";

const server = process.env.REACT_APP_SERVER_URL;
export const GetTestHistory = async (serialNumber, mfgYear, testType, {setPruebasCodigoNoIdentif, setPruebasFA, setPruebasPCB}, setLoadingPCB, setLoadingFA) => { 
   
    try {
        const response = await axios.get(`${server}/api/Historial?numSerie=${serialNumber}&year=${mfgYear}`)
       // console.log(response.data);
        if (response.data.length === 0 || response === undefined) { //WHEN WE HAVEN'T A TEST HISTORY
            const failMessage = () =>{
                Swal.fire({
                    position: "center",
                    icon: "warning",
                    text: `No se encontro registro de pruebas para el codigo ${serialNumber}.`,
                    showConfirmButton: true,
                    timer: 10000
                });
            }  
            //Disable the search animmations.
            if (testType === "PCB") {
                failMessage()
                setPruebasPCB(0)
                setLoadingPCB(false);
            } else if (testType === "FA") {
                failMessage()
                setPruebasFA(0)
                setLoadingFA(false);
            }else if(testType === "GM15Serial"){
               // GetGMSerialRelation(serialNumber);
                return("Could not found test history");

            }else{
                failMessage()
                setPruebasCodigoNoIdentif(0)
                setLoadingFA(false);
            }
        }else { // when we got Test History

            if (testType === "PCB") {
                setPruebasPCB(response.data)
                setLoadingPCB(false);
            } else if (testType === "FA") {
                setPruebasFA(response.data)
                setLoadingFA(false);
            }else if(testType === "GM15Serial"){
               setPruebasFA(response.data)
               setLoadingFA(false);
            }else{
                setPruebasCodigoNoIdentif(response.data);
                setLoadingFA(false);
            }
        }
    } catch (error) {
        console.log(error);
        throw error;
        setLoadingFA(false);
        setLoadingPCB(false);
    }
};