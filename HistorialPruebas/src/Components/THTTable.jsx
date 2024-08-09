import { React, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "../styles/TableComponents.css";
import { Button, Spinner } from "react-bootstrap";
import * as FaIcons from "react-icons/fa";
import usePagination from "./Pagination";
import axios from "axios";
import Swal from "sweetalert2";
import ModalPCBProductionBy from "./ModalPCBDetailProductionBy";

const THTTable = (props) => {
  //console.log(props);
  const server = process.env.REACT_APP_SERVER_URL;
  const [componentsdata, setComponentsdata] = useState([]);
  const [loadingTHT, setLoadingTHT] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const itemsPerPage = 200; // Cambia esto para ajustar el número de elementos por página
  const { currentData } = usePagination(filteredData, itemsPerPage);

  //Variables para Modal de PCBS segun algun dato de la tabla:
  const [showModal, setShowModal] = useState(false);
  const [triggeredBy, setTriggeredBy] = useState("");
  const [SearchCriterial, setSearchCriterial] = useState("");
  const [component, setComponent] = useState("");

  const GetTHTComponents = async (pcb) => {
    const mfgYear = pcb.slice(1, 2);
    if (componentsdata.length > 0) {
      return;
    } else {
      try {
        setLoadingTHT(true);
        const response = await axios.get(
          `${server}/api/THTcomponents?serialnumber=${pcb}&mfgYear=${mfgYear}`
        );
        if (
          response.data.length === 0 ||
          response === undefined ||
          response.data[0].parent === ""
        ) {
          setLoadingTHT(false);
          Swal.fire({
            position: "center",
            icon: "warning",
            title: `No se encontraron Componentes consumidos por el PCB, ${props.PCB}`,
            showConfirmButton: false,
            timer: 1400,
          });
        } else {
          //console.log(response.data);
          setLoadingTHT(false);
          setComponentsdata(response.data);
          props.setTopThtComponets(response.data);
        }
      } catch (error) {
        console.log(error);
        setLoadingTHT(false);
        throw error;
      }
    }
  };

  useEffect(() => {
    GetTHTComponents(props.PCB);
  }, [props.PCB]);

  // Filtrar datos cuando el término de búsqueda cambia
  useEffect(() => {
    const results = componentsdata.filter((component) =>
      Object.values(component).some((value) =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredData(results);
  }, [searchTerm, componentsdata]);

  //Metodos para el modal segun UID o Lot
  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleLinkClick = (event, btnclicked, searchCriterial, component) => {
    event.preventDefault();
    setShowModal(true);
    setTriggeredBy(btnclicked);
    setSearchCriterial(searchCriterial);
    setComponent(component);
    //console.log('CLick');
  };

  return (
    <div className="table-responsive CTitulos ">
      {loadingTHT === true ? (
        <Spinner
          id="loading SMT Top"
          animation="border"
          className="espaciadoVertical"
        />
      ) : componentsdata.length === 0 ? (
        <div>
          <h1>
            <FaIcons.FaExclamationTriangle />
          </h1>
          <h3>No se encontraron componentes consumidos por {props.PCB}</h3>
        </div>
      ) : (
        <div>
          <table className="table table-hover table-sm table-striped scroll">
            <thead className="table-dark CTitulos">
              <tr key={0}>
                <th>Serial Number</th>
                <th>MID</th>
                <th>Lot Vendor</th>
                <th>Part Number</th>
                <th>Line</th>
                <th>Date Time</th>
              </tr>
            </thead>
            <tbody>
              {currentData().map((components) => (
                <tr id={components.idHistory}>
                  <td>{components.serialNumber}</td>
                  <td>{components.mid}</td>
                  <td>{components.lot_vendor}</td>
                  <td>{components.partNumber}</td>
                  <td>{components.linea}</td>
                  <td>{components.timeSpan}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h3>Found THT components: {componentsdata.length}</h3>
          <ModalPCBProductionBy
            show={showModal}
            handleClose={handleCloseModal}
            triggeredBy={triggeredBy}
            searchCriterial={SearchCriterial}
            component={component}
          />
        </div>
      )}
    </div>
  );
};
export default THTTable;
