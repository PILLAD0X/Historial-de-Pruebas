import {React, useState} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/TableComponents.css'
import { Button } from "react-bootstrap";
import * as FaIcons from "react-icons/fa";
import SiplaceTable from "./SiplaceTable";
import PanasonicTable from "./PanasonicTable";
import THTTable from "./THTTable";
const ComponentsTable = ({props}) => {
  //  console.log(props);
    return (
        <>
            {props.triggeredBy === 'Top' ?
                <div className="table-responsive CTitulos ">
                    <h1>SMT</h1>
                    {props.technology === 'Panasonic' ?
                        <PanasonicTable/>
                        : 

                        <SiplaceTable/>
                    }
                    <h1>THT</h1>
                    <THTTable/>
                    <div className="">
                        <Button
                            className=""
                            variant="primary"
                            title="Exportar Datos"
                            id="input"
                        // onClick={exportToExcel}
                        >
                            Descargar Componentes <FaIcons.FaDownload />
                        </Button>
                    </div>
                </div>
                :
                <div className="table-responsive CTitulos ">
                    <h1>SMT</h1>
                    {props.technology === 'Panasonic' ?
                        <PanasonicTable/>
                        :
                        <SiplaceTable/>
                    }
                    <div className="">
                        <Button
                            className=""
                            variant="primary"
                            title="Exportar Datos"
                            id="input"
                        // onClick={exportToExcel}
                        >
                            Descargar Componentes <FaIcons.FaDownload />
                        </Button>
                    </div>
                </div>
            }
        
        </>


    )

}

export default ComponentsTable;