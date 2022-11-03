import React, { useRef, useState } from "react"; 
import { Button, Spinner, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Home.css";
import * as FaIcons from "react-icons/fa";
import TablePruebasPCB from "../Components/TablePruebasPCB";
import axios from "axios";
import ParentChild from "../Components/ParentChild";
import Footer from "../Components/Footer";
import * as XLSX from "xlsx/xlsx.mjs";
import swal from "sweetalert";
import Parseo from "../Components/parseo";
import Sidebar from "../Components/Sidebar";
import DetalleCodigo from "../Components/DetalleCodigo";
import IconLimpiar from "../icons/IconLimpiar";

const Home = () => {
  //VARIBALES PARA exportar a excel
  const [pruebasPCB, setPruebasPCB] = useState([]);
  const [pruebasFA, setPruebasFA] = useState([]);
  const [pruebasCodigoNoIdentif, setPruebasCodigoNoIdentif] = useState([]);
  const [parentChild, setParentChild] = useState([]); //variable donde recibimos la relacion de parent y child
  const [mfgYear, setMfgYear] = useState([""]);
  const [detalle70Barcode, setdetalle70Barcode] = useState([]); // variable para el desglose de la conversion a series de 70, 23, 15.
  const valorBuscar = useRef(); //variable para tomar lo escrito en el input de la serie
  const [loadingPCBData, setLoadingPCBData] = useState(false);
  const [loadingFAData, setLoadingFAData] = useState(false);

  const server = process.env.REACT_APP_SERVER_URL;

  // metodo llamado que des encadena la ejecucion
  const ejecucion = () => {
    const valorBusqueda = valorBuscar.current.value;
    if (valorBusqueda !== "" && valorBusqueda !== null) {
      //Variables para el loader y datos para mostrar en la tabla
      limpiarPantalla();
      setLoadingPCBData(true);
      setLoadingFAData(true);
      buscarParetChild(valorBusqueda); // se llama la busqueda del parent - child
    } else {
      // cuando se recibe un valor vacio.
    }
  };

  //se recibe el valor de busqueda y buscamos la relacion parent - child.
  const buscarParetChild = (valorBusqueda) => {
    if (
      valorBusqueda.length === 15 ||
      valorBusqueda.length === 23 ||
      valorBusqueda.length === 36 ||
      valorBusqueda.length === 43 ||
      valorBusqueda.length === 45 ||
      valorBusqueda.length === 55 ||
      valorBusqueda.length === 70
    ) {
      try {
        axios
          .get(`${server}/api/ParentChildRelation/${valorBusqueda}`) //Hacemos la llamada al API.
          .then((response) => {
            if (
              response.data ===
              "No se encontro una relacion entre Parent y Child"
            ) {
              //Cuando no hay relacion de parent y child en genie
              setParentChild(response.data);
              swal({
                // alerta al usuario
                title: "ATENCION",
                text: "No se encontro una relacion entre Parent y Child",
                icon: "info",
                button: "Aceptar",
              });

              setMfgYear(response.data);

              if (valorBusqueda.length === 15) {
                swal({
                  // alerta al usuario
                  title: "ATENCION",
                  text: "No se pudo realizar la busqueda ya que no se pudo determinar el año de manufactura del producto. \nFavor de contactar a MEIS",
                  icon: "error",
                  button: "Aceptar",
                });

                setLoadingPCBData(false);
                setLoadingFAData(false);
              } else if (valorBusqueda.length > 15) {
                setLoadingPCBData();
                if (valorBusqueda.length === 23) {
                  const year = valorBusqueda.substr(1, 1);
                  GetTestHistory(valorBusqueda, year, "NA");
                } else {
                  //hacemos la busqueda del historial del pruebas, pasando primero por el parseo.
                  convertirALLto23(Parseo(valorBusqueda));
                }
              }
            } else {
              //cuando hay relacion de parent child en genie. TODAVIA PENDIENTE DE FINALIZAR

              setParentChild(response.data[0]);

              setMfgYear(response.data[0].mfg_year);
              GetTestHistory(
                response.data[0].child,
                response.data[0].mfg_year,
                "PCB"
              );

              if (
                response.data[0].parent.length === 15 ||
                response.data[0].parent.length === 23
              ) {
                // si el parent tiene la longitud permitida se hace las busquedas de las pruebas
                GetTestHistory(
                  response.data[0].parent,
                  response.data[0].mfg_year,
                  "FA"
                );
              } else if (response.data[0].parent.length > 23) {
                convertirALLto23(Parseo(response.data[0].parent));
              }
            }
          });
      } catch (error) {
        console.log(error);

        setLoadingPCBData(false);
        setLoadingFAData(false);
      }
    } else {
      setLoadingPCBData(false);
      setLoadingFAData(false);
      swal({
        title: "ERROR",
        text: "El codigo ingresado no cumple con la longitud estandar, la logitud estandar permitida para las series es de: 15, 23, 36, 43, 45, 55, 70 caracteres.",
        icon: "error",
        button: "Aceptar",
      });
    }
  };

  const convertirALLto23 = (codigo) => {
    try {
      axios.get(`${server}/api/Parseo/${codigo}`).then((response) => {
        if (
          response.data ===
          "El codigo ingresado no cumple con la longitud estandar, la logitud estandar permitida para las series es: 15, 23, 36, 43, 45, 55, 70"
        ) {
          swal({
            title: "ERROR",
            text: "El codigo ingresado no cumple con la longitud estandar, la logitud estandar permitida para las series es de: 15, 23, 36, 43, 45, 55, 70 caracteres.",
            icon: "error",
            button: "Aceptar",
          });

          setLoadingPCBData(false);
          setLoadingFAData(false);
        } else {
          const year = response.data.code23.substr(1, 1);
          setdetalle70Barcode(response.data);
          GetTestHistory(response.data.code23, year, "FA");
        }
      });
    } catch (error) {
      console.log(error);

      setLoadingPCBData(false);
      setLoadingFAData(false);
    }
  };

  const GetTestHistory = async (serialNumber23, mfgYear, testType) => {
    try {
      await axios
        .get(
          `${server}/api/Historial/${serialNumber23}?mfgyear=${mfgYear}`
        )
        .then((response) => {
          // return(response.data);

          if (response.data === "NO EXISTEN DATOS") {
            swal({
              title: "ATENCION",
              text: `No se encontro resgistro de pruebas para el codigo ${serialNumber23}.`,
              icon: "warning",
              button: "Aceptar",
            });

            //Desactivando las animaciones de busqueda
            if (testType === "PCB") {
              setLoadingPCBData(false);
            } else if (testType === "FA") {
              setLoadingFAData(false);
            } else {
              setLoadingFAData(false);
            }
          } else {
            if (testType === "PCB") {
              // PRUEBAS HECHAS A LA PLACA
              setPruebasPCB(response.data);
              setLoadingPCBData(false);
            } else if (testType === "FA") {
              //PRUEBAS DE ENSAMBRE FINAL
              setPruebasFA(response.data);
              setLoadingFAData(false);
            } else {
              //PRUEBAS NO IDENTIFICADAS (Sin relacion parent-child)
              setPruebasCodigoNoIdentif(response.data);
              console.log(response.data)
              setLoadingFAData(false);
            }
          }
        });
      //setLoadingFAData(false);
    } catch (error) {
      // console.log(error);
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
    setLoadingPCBData(false);
    setLoadingFAData(false);
    setMfgYear("");
    valorBuscar.current.value = "";
    valorBuscar.current.focus();
  };
  //Metodo que sirve para exportar los datos a Excel.
  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(pruebasFA);
    const ws2 = XLSX.utils.json_to_sheet(pruebasPCB);
    const ws3 = XLSX.utils.json_to_sheet(pruebasCodigoNoIdentif);
    const wb = XLSX.utils.book_new();

    //validamos si existen datos de prueba guardados en las varibles para generar las hojas de excel.
    if (pruebasPCB.length > 0) {
      XLSX.utils.book_append_sheet(wb, ws2, "Pruebas PCB");
    } else {
    }
    if (pruebasFA.length > 0) {
      XLSX.utils.book_append_sheet(wb, ws, "Pruebas FA");
    } else {
    }
    if (pruebasCodigoNoIdentif.length > 0) {
      XLSX.utils.book_append_sheet(wb, ws3, "Pruebas sin relacion en Genie");
    } else {
    }

    if (pruebasPCB.length > 0) {
      XLSX.writeFile(
        wb,
        `Historial de Pruebas ${pruebasPCB[0].barcodeSerialNumber}.xlsx`
      ); //Agregar el modelo al nombre del documento.
    } else if (pruebasFA.length > 0) {
      XLSX.writeFile(
        wb,
        `Historial de Pruebas ${pruebasFA[0].barcodeSerialNumber}.xlsx`
      ); //Agregar el modelo al nombre del documento.
    } else if (pruebasCodigoNoIdentif.length > 0) {
      XLSX.writeFile(
        wb,
        `Historial de Pruebas ${pruebasCodigoNoIdentif[0].barcodeSerialNumber}.xlsx`
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
      <div className="container">
        <div className="container">
          <Form.Control
            className="txtbusqueda"
            size="text"
            type="text"
            placeholder="Ingrese codigo a buscar"
            ref={valorBuscar}
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

      {parentChild.length === 0 ? (
        <h6> </h6>
      ) : (
        <ParentChild datos={parentChild} />
      )}
      {detalle70Barcode.length === 0 ? (
        <h6> </h6>
      ) : (
        <DetalleCodigo datos={detalle70Barcode} />
      )}

      {pruebasPCB.length === 0 ? (
        <h6> </h6>
      ) : (
        <h2 className="espaciadoVertical">Pruebas PCB</h2>
      )}

      {loadingPCBData && pruebasPCB.length === 0 ? (
        <Spinner animation="border" className="espaciadoVertical" />
      ) : (
        <h6> </h6>
      )}

      {pruebasPCB.length === 0 ? (
        <h6> </h6>
      ) : (
        <TablePruebasPCB infoPCBTable={pruebasPCB} />
      )}

      {pruebasFA.length === 0 ? (
        <h6> </h6>
      ) : (
        <h2 className="espaciadoVertical">Pruebas Ensamble Final</h2>
      )}

      {loadingFAData && pruebasPCB.length === 0 ? (
        <Spinner animation="border" className="espaciadoVertical" />
      ) : (
        <h6> </h6>
      )}

      {pruebasFA.length === 0 ? (
        <h6> </h6>
      ) : (
        <TablePruebasPCB infoPCBTable={pruebasFA} />
      )}

      {pruebasCodigoNoIdentif.length === 0 ? (
        <h6> </h6>
      ) : (
        <h2 className="espaciadoVertical">Historial de pruebas:</h2>
      )}

      {pruebasCodigoNoIdentif.length === 0 ? (
        <h6> </h6>
      ) : (
        <TablePruebasPCB infoPCBTable={pruebasCodigoNoIdentif} />
      )}

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