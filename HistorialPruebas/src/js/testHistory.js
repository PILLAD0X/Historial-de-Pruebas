import Swal from "sweetalert2";
import { setLoadingFAData, setLoadingPCBData } from "./loadingState";
import axios from "axios";

const server = process.env.REACT_APP_SERVER_URL;

export const getTestHistory = async (serialNumber, mfgYear, testType, {setPruebasCodigoNoIdentif, setPruebasFA, setPruebasPCB}) => { 
   
    try {
        //console.log(serialNumber)
        const response = await axios.get(`${server}/api/Historial?numSerie=${serialNumber}&year=${mfgYear}`)
       // console.log(`${server}/api/Historial?numSerie=${serialNumber}&year=${mfgYear}`);
      // console.log(response.data,testType);
        if (response.data.length === 0 || response === undefined) {

            Swal.fire({
                position: "center",
                icon: "warning",
                text: `No se encontro registro de pruebas para el codigo ${serialNumber}.`,
                showConfirmButton: true,
                timer: 2000
            });

            //Disable the search animmations.
            if (testType === "PCB") {
                setPruebasPCB(0)
                setLoadingPCBData(false);
            } else if (testType === "FA") {
                setPruebasFA(0)
                setLoadingFAData(false);
            }else{
                setPruebasCodigoNoIdentif(0)
                setLoadingFAData(false);
            }
        }else {

            if (testType === "PCB") {

                setPruebasPCB(response.data)
                setLoadingPCBData(false);

            } else if (testType === "FA") {

               // console.log(response.data);
                setPruebasFA(response.data)
                setLoadingFAData(false);

            }else{

                setPruebasCodigoNoIdentif(response.data);
                setLoadingFAData(false);
            }
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
};