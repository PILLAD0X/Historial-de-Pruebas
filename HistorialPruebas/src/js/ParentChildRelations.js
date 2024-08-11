import Swal from "sweetalert2";
import axios from "axios";
import { useState } from "react";

const server = process.env.REACT_APP_SERVER_URL;

export const GetParentChildRelation = async (
  serialNumber,
  setParentChild,
  setLoadingPCB
) => {
  try {
    const response = await axios.get(
      `${server}/api/ParentChildRelation?serialNumber=${serialNumber}`
    );

    if (response.data[0].parent === "" && response.data[0].child === "") {
      setParentChild("No se encontro una relacion entre Parent y Child");
      //"success", "error", "warning", "info"
      Swal.fire({
        position: "center",
        icon: "warning",
        title: "No se encontro una relacion entre amplificador y PCB",
        showConfirmButton: false,
        timer: 1400,
      });
      setLoadingPCB(false);

      return "No se encontro una relacion entre Parent y Child";
    } else if (
      response.data[0].parent === "" &&
      response.data[0].child !== ""
    ) {
      setParentChild(response.data[0]);
      //"success", "error", "warning", "info"
      Swal.fire({
        position: "center",
        icon: "warning",
        title: "El PCB aun no se ensambla en un Amplificador",
        showConfirmButton: false,
        timer: 3000,
      });
      setLoadingPCB(false);

      return "El PCB aun no se ensambla en un Amplificador";
    } else {
      setParentChild(response.data[0]);

      return response.data[0];
    }
  } catch (error) {
    console.log(error);
    setLoadingPCB(false);
    throw error;
  }
};
