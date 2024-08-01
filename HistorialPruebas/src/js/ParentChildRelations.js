import Swal from "sweetalert2";
import axios from "axios";
import { useState } from "react";

const server = process.env.REACT_APP_SERVER_URL;

export const GetParentChildRelation = async (serialNumber, setParentChild, setLoadingPCB) => { 
    try {
        const response = await axios.get(`${server}/api/ParentChildRelation?serialNumber=${serialNumber}`);

        if (response.data.length === 0 || response === undefined || response.data[0].parent ==='') {
            
            setParentChild('No se encontro una relacion entre Parent y Child');
            //"success", "error", "warning", "info"
            Swal.fire({
                position: "center",
                icon: "warning",
                title: "No se encontro una relacion entre amplificador y PCB",
                showConfirmButton: false,
                timer: 1400
            });
            setLoadingPCB(false);
            
            return('No se encontro una relacion entre Parent y Child');

        }else{
            setParentChild(response.data[0])
            
            return response.data[0];
        }
    } catch (error) {
        console.log(error);
        setLoadingPCB(false);
        throw error;
    }

}
/*
const PcbTopBottomRelation = async (serialNumber, setParentChild) => { 
    const mfgYear = serialNumber.substring(1,2);
    const serialP1 = serialNumber.substring(0,9);
    const serialP2 = serialNumber.substring(11,23);
   // F3354069701832255113050
    //console.log('SerialP1: '+serialP1+' SerialP2: '+serialP2);
    try {
        
        //  console.log(`${server}/api/PcbRelation?serialP1=${serialP1}&serialP2=${serialP2}&year=${mfgYear}`);
        const response = await axios.get(`${server}/api/PcbRelation?serialP1=${serialP1}&serialP2=${serialP2}&year=${mfgYear}`)
       // console.log(response);

        if (response.data.length === 0 || response === undefined) {
            console.log("No hay datos de TSS BSS");
            return "End process"

        }else{
            //return response.data[0];
            console.log("SI hay datos de TSS BSS: ", response.data[0]);
            setParentChild((prevParentChildInfo) => [...prevParentChildInfo, response.data[0]])
        }
    } catch (error) {
        console.log(error);
        throw error;
    }

}
*/