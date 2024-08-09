import { React, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "../styles/TableComponents.css";
import { Button } from "react-bootstrap";
import * as FaIcons from "react-icons/fa";
import SiplaceTable from "./SiplaceTable";
import PanasonicTable from "./PanasonicTable";
import THTTable from "./THTTable";

import * as XLSX from "xlsx/xlsx.mjs";
const ComponentsTable = ({ props }) => {
  // console.log(props);
  //console.log(props.PCB);
  const [topSmtComponents, setTopSmtComponents] = useState([""]);
  const [topThtComponents, setTopThtComponets] = useState([""]);
  const [bottonSmtComponents, setbottomSmtComponents] = useState([""]);

  //Metodo que sirve para exportar los datos a Excel.
  const exportToExcel = () => {
    const ws = Array.isArray(topSmtComponents)
      ? XLSX.utils.json_to_sheet(topSmtComponents)
      : null;
    const ws2 = Array.isArray(bottonSmtComponents)
      ? XLSX.utils.json_to_sheet(bottonSmtComponents)
      : null;
    const ws3 = Array.isArray(topThtComponents)
      ? XLSX.utils.json_to_sheet(topThtComponents)
      : null;
    const wb = XLSX.utils.book_new();

    //validamos si existen datos de prueba guardados en las varibles para generar las hojas de excel.
    if (bottonSmtComponents.length > 0) {
      XLSX.utils.book_append_sheet(wb, ws2, "Bottom SMT Components");
    } else {
    }
    if (topSmtComponents.length > 0) {
      XLSX.utils.book_append_sheet(wb, ws, "Top SMT Components");
    } else {
    }
    if (topThtComponents.length > 0) {
      XLSX.utils.book_append_sheet(wb, ws3, "THT Components");
    } else {
    }

    if (bottonSmtComponents.length > 0) {
      XLSX.writeFile(wb, `Components Consumed by ${props.PCB}.xlsx`); //Agregar el modelo al nombre del documento.
    } else if (topSmtComponents.length > 0) {
      XLSX.writeFile(wb, `Components Consumed by ${props.PCB}.xlsx`); //Agregar el modelo al nombre del documento.
    } else if (topThtComponents.length > 0) {
      XLSX.writeFile(wb, `Components Consumed by ${props.PCB}.xlsx`); //Agregar el modelo al nombre del documento.
    }
    //  XLSX.writeFile(wb, `Historial de Pruebas.xlsx`); //Agregar el modelo al nombre del documento.
  };
  return (
    <>
      {props.triggeredBy === "Top" ? (
        <div className="table-responsive CTitulos ">
          <h1>SMT</h1>
          {props.technology === "Panasonic" ? (
            <PanasonicTable
              setTopSmtComponents={setTopSmtComponents}
              setbottomSmtComponents={setbottomSmtComponents}
              PCBSide={props.triggeredBy}
              PCB={props.PCB}
            />
          ) : (
            <SiplaceTable
              setTopSmtComponents={setTopSmtComponents}
              setbottomSmtComponents={setbottomSmtComponents}
              PCBSide={props.triggeredBy}
              PCB={props.PCB}
              mfgLine={props.mfgLine}
            />
          )}
          <h1>THT</h1>
          <THTTable setTopThtComponets={setTopThtComponets} PCB={props.PCB} />
        </div>
      ) : (
        <div className="table-responsive CTitulos ">
          <h1>SMT</h1>
          {props.technology === "Panasonic" ? (
            <PanasonicTable
              setTopSmtComponents={setTopSmtComponents}
              setbottomSmtComponents={setbottomSmtComponents}
              PCBSide={props.triggeredBy}
              PCB={props.PCB}
            />
          ) : (
            <SiplaceTable
              setTopSmtComponents={setTopSmtComponents}
              setbottomSmtComponents={setbottomSmtComponents}
              PCBSide={props.triggeredBy}
              PCB={props.PCB}
              mfgLine={props.mfgLine}
            />
          )}
        </div>
      )}
      {topSmtComponents === "" ||
      topThtComponents === "" ||
      bottonSmtComponents === "" ? (
        <p></p>
      ) : (
        <div className="table-responsive CTitulos ">
          <div className="">
            <Button
              className=""
              variant="primary"
              title="Export Data"
              id="input"
              onClick={exportToExcel}
            >
              Download Components <FaIcons.FaDownload />
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default ComponentsTable;
