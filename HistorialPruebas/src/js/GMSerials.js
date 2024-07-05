import Swal from "sweetalert2";
import axios from "axios";

const server = process.env.REACT_APP_SERVER_URL;
export const GetGMSerialRelation = async (serialNumber, setLoadingPCB, setLoadingFA) => { 
    try {
        const response = await axios.get(`${server}/api/GMSerials?serialNumber=${serialNumber}`)
        if (response.data.length === 0 || response === undefined) {

            Swal.fire({ //WE KEPT THIS ERROR MESSAGE BECAUSE IN CASE OF WE COULDN'T GET THIS DATA WILL FINISH THE SEARCH PROCESS.
                position: "center",
                icon: "warning",
                text: `No se encontro registro de pruebas para el codigo ${serialNumber}.`,
                showConfirmButton: true,
                timer: 2000
            });

            return "End process"
          setLoadingFA(false)
        }else{
            const GM70SerialNumber = response.data[0].code70
            return GM70SerialNumber;
        }
    } catch (error) {
        console.log(error);
        throw error;
        setLoadingFA(false);
        setLoadingPCB(false);
    }

}