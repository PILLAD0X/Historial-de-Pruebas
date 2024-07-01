import React, { useRef, useState } from "react"; 
import { Button, Spinner, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Home.css";
import * as FaIcons from "react-icons/fa";
import TestTable from "../Components/TestsTable";
import ParentChild from "../Components/ParentChild";
import Footer from "../Components/Footer";
import * as XLSX from "xlsx/xlsx.mjs";
import Sidebar from "../Components/Sidebar";
import DetalleCodigo from "../Components/DetalleCodigo";
import IconLimpiar from "../icons/IconLimpiar";

// nuevos imports en el proceso de modularizacion
import { MainExecution} from "../js/MainExecution";
import {useLoading} from '../js/LoadingContext'

const Home = () => {
  //VARIBALES PARA exportar a excel
  const [pruebasPCB, setPruebasPCB] = useState([]);
  const [pruebasFA, setPruebasFA] = useState([]);
  const [pruebasCodigoNoIdentif, setPruebasCodigoNoIdentif] = useState([]);
  const [parentChild, setParentChild] = useState([]); //variable donde recibimos la relacion de parent y child
  
  const [detalle70Barcode, setdetalle70Barcode] = useState([]); // variable para el desglose de la conversion a series de 70, 23, 15.
  const txtSerialNumber = useRef(); //variable para tomar lo escrito en el input de la serie
  const { loadingPCB, setLoadingPCB, loadingFA, setLoadingFA  } = useLoading();

  const handleGetParetChild = (serialNumber) => {
    MainExecution(serialNumber, setParentChild, setdetalle70Barcode, setPruebasCodigoNoIdentif,setPruebasFA, setPruebasPCB, setLoadingPCB, setLoadingFA);    
  };  
  
  // metodo llamado que desencadena la ejecucion
  const ejecucion = async ()=> {
    const serialNumber = txtSerialNumber.current.value;

    if (serialNumber !== "" && serialNumber !== null) {
      //confirm that all components are in default status and assign the load icons as working
      limpiarPantalla();
      setLoadingPCB(true);
      setLoadingFA(true);
      handleGetParetChild(serialNumber);
    }else {
      // cuando se recibe un valor vacio.
    }
  };

  //funcion para guardar lo que se esta escribiendo en el buscador
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      ejecucion();
    }
  };
  //funcion de limpiar pantalla
  const limpiarPantalla = () => {
    setPruebasPCB([]);
    setPruebasFA([]);
    setPruebasCodigoNoIdentif([]);
    setParentChild([]);
    setdetalle70Barcode([]);
    setLoadingPCB(false);
    setLoadingFA(false);
    txtSerialNumber.current.value = "";
    txtSerialNumber.current.focus();
  };
  //Metodo que sirve para exportar los datos a Excel.
  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(pruebasFA);
    const ws2 = XLSX.utils.json_to_sheet(pruebasPCB);
    const ws3 = XLSX.utils.json_to_sheet(pruebasCodigoNoIdentif);
    const wb = XLSX.utils.book_new();

    //validamos si existen datos de prueba guardados en las varibles para generar las hojas de excel.
    if (pruebasPCB.length > 0) {
      XLSX.utils.book_append_sheet(wb, ws2, "Tests PCB");
    } else {
    }
    if (pruebasFA.length > 0) {
      XLSX.utils.book_append_sheet(wb, ws, "Tests Final Assembly");
    } else {
    }
    if (pruebasCodigoNoIdentif.length > 0) {
      XLSX.utils.book_append_sheet(wb, ws3, "Tests without AmpRelation");
    } else {
    }

    if (pruebasPCB.length > 0) {
      XLSX.writeFile(
        wb,
        `Test history ${pruebasPCB[0].barcodeSerialNumber}.xlsx`
      ); //Agregar el modelo al nombre del documento.
    } else if (pruebasFA.length > 0) {
      XLSX.writeFile(
        wb,
        `Test history ${pruebasFA[0].barcodeSerialNumber}.xlsx`
      ); //Agregar el modelo al nombre del documento.
    } else if (pruebasCodigoNoIdentif.length > 0) {
      XLSX.writeFile(
        wb,
        `Test history ${pruebasCodigoNoIdentif[0].barcodeSerialNumber}.xlsx`
      ); //Agregar el modelo al nombre del documento.
    }
    //  XLSX.writeFile(wb, `Historial de Pruebas.xlsx`); //Agregar el modelo al nombre del documento.
  };

  return (
    <div>
      <Sidebar />
      <div className="containerTitulo">
        <h1>Historial de Pruebas</h1>
      </div>
      {/**COMPONENTES PARA LA BUSQUEDA */}
      <div className="container">
        <div className="container">
          <Form.Control
            className="txtbusqueda"
            size="text"
            type="text"
            placeholder="Ingrese codigo a buscar"
            ref={txtSerialNumber}
            autoFocus
            onKeyDown={handleKeyDown}
          />
          <Button
            variant="primary"
            className="btnbuscar"
            title="Buscar"
            id="input"
            onClick={ejecucion}
          >
            <FaIcons.FaSearch />
          </Button>
        </div>
        <Button
          variant="primary"
          className="btnlimpiar bg-warning text-dark"
          title="Limpiar Pantalla"
          onClick={limpiarPantalla}
        >
          <IconLimpiar width={30} height={30} />
        </Button>
      </div>

    {/** DATOS RELACIONADOS AL PARENT Y CHILD */}
      {parentChild.length === 0 ? (
        <h6> </h6>
      ) : (
        <ParentChild datos={parentChild} />
      )}

      {/**DESGLOSE DEL CODIGO DE  70 CARACTERES */}
      {detalle70Barcode.length === 0 ? (
        <h6></h6>
      ) : (
        <DetalleCodigo datos={detalle70Barcode} />
      )}

  

      {loadingPCB && pruebasPCB.length === 0 ? (
        <Spinner id="loading PCB info" animation="border" className="espaciadoVertical" />
      ) : (
        <h6> </h6>
      )}

      {/**TABLA EN CASO DE PCB */}
      {pruebasPCB.length > 0 || pruebasPCB.length ==undefined ? (
        <TestTable tableType={"PCB"} infoTestTable={pruebasPCB} />

      ) : (
        <h6></h6>
      )}


      {loadingFA === true && pruebasFA.length === 0 ? (
        <Spinner id="loading FA info" animation="border" className="espaciadoVertical" />
      ) : (
        <h6> </h6>
      )}

      {/** TABLA EN CASO DE FINAL ASSEMBLY*/}
      {pruebasFA.length === 0 ? (
        <h6> </h6>
      ) : (
        <TestTable tableType={"FinalAssembly"} infoTestTable={pruebasFA} />
      )}

      {/** TABLA EN CASO DE OTHERS*/}
      {pruebasCodigoNoIdentif.length === 0 ? (
        <h6> </h6>
      ) : (
        <TestTable tableType={"Others"} infoTestTable={pruebasCodigoNoIdentif} />
      )}

      {/** BOTON PARA DESCARGAR LA INFORMACION*/}
      {pruebasFA.length > 0 ||
      pruebasPCB.length > 0 ||
      pruebasCodigoNoIdentif.length > 0 ? (
        <div className="">
          <Button
            className=""
            variant="primary"
            title="Exportar Datos"
            id="input"
            onClick={exportToExcel}
          >
            Descargar Datos <FaIcons.FaDownload />
          </Button>
        </div>
      ) : (
        <h6> </h6>
      )}

      <Footer />
    </div>
  );
};

export default Home;
//Developer: Julio Pillado.
//Analyst: Ernesto Aguero.