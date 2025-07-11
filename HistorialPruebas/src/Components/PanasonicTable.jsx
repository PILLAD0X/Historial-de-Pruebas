import { React, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "../styles/TableComponents.css";
import usePagination from "./Pagination";
import axios from "axios";
import Swal from "sweetalert2";
import { Button, Form, Spinner } from "react-bootstrap";
import * as FaIcons from "react-icons/fa";
import * as GiIcons from "react-icons/gi";
import ModalPCBProductionBy from "./ModalPCBDetailProductionBy";

const PanasonicTable = (props) => {
  //console.log(props);
  const server = process.env.REACT_APP_SERVER_URL;
  const [componentsdata, setComponentsdata] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const itemsPerPage = 25; // Cambia esto para ajustar el número de elementos por página
  const { next, prev, currentData, currentPage, maxPage } = usePagination(
    filteredData,
    itemsPerPage
  );

  //Variables to Modal PCBS manufactured by
  const [showModal, setShowModal] = useState(false);
  const [triggeredBy, setTriggeredBy] = useState("");
  const [SearchCriterial, setSearchCriterial] = useState("");
  const [component, setComponent] = useState("");

  const GetPanasonicComponents = async (pcb) => {
    // Verificar si ya se tienen los datos para evitar la llamada a la API
    if (componentsdata.length > 0) {
      return;
    } else {
      const SerialNumberP1 = pcb.slice(0, 9);
      const SerialNumberP2 = pcb.slice(11, 23);
      try {
        setLoading(true);
        const response = await axios.get(
          `${server}/api/PanasonicComponents?serialnumberP1=${SerialNumberP1}&serialnumberP2=${SerialNumberP2}`
        );
        if (
          response.data.length === 0 ||
          response === undefined ||
          response.data[0].parent === ""
        ) {
          setLoading(false);
          Swal.fire({
            position: "center",
            icon: "warning",
            title: `No se encontraron Componentes consumidos por el PCB, ${pcb}`,
            showConfirmButton: false,
            timer: 1400,
          });
        } else {
          setLoading(false);
          setComponentsdata(response.data);

          if (props.PCBSide === "Top") {
            props.setTopSmtComponents(response.data);
          } else {
            props.setbottomSmtComponents(response.data);
          }
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
        throw error;
      }
    }
  };
  useEffect(() => {
    GetPanasonicComponents(props.PCB);
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

  //MODAL PCBS manufactured by Lot / UID
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
      {loading === true ? (
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
          <h3>No se encontraron componentes consumidos por {props.PCB}.</h3>
        </div>
      ) : (
        <div>
          <div className="buscador">
            <Form.Control
              className="txtbusquedaComponentes"
              size="text"
              type="text"
              placeholder="Search Componet Number"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button
              variant="primary"
              className="btnbuscar"
              title="Buscar"
              id="input"
            >
              <FaIcons.FaSearch />
            </Button>
          </div>
          <table className="table table-hover table-sm table-striped scroll">
            <thead className="table-dark CTitulos">
              <tr key={componentsdata.SmtTraceabilityPanasonicId}>
                <th>Serial Number</th>
                <th>Part No</th>
                <th>Vendor</th>
                <th>Lot Vendor</th>
                <th>Unique ID</th>
                <th>Date Time</th>
              </tr>
            </thead>
            <tbody>
              {currentData().map((components) => (
                <tr key={componentsdata.SmtTraceabilityPanasonicId}>
                  <td>{components.barcode}</td>
                  <td>{components.partNo}</td>
                  <td>{components.vendorNo}</td>
                  <td>
                    <a
                      href="/#"
                      title="Show PCBs creared by this Unique ID"
                      key={componentsdata.SmtTraceabilityPanasonicId}
                      onClick={(e) =>
                        handleLinkClick(
                          e,
                          "Lot",
                          components.lotNo,
                          components.partNo
                        )
                      }
                    >
                      {components.lotNo}
                    </a>
                  </td>
                  <td>
                    <a
                      href="/#"
                      title="Show PCBs creared by this Unique ID"
                      key={componentsdata.SmtTraceabilityPanasonicId}
                      onClick={(e) =>
                        handleLinkClick(
                          e,
                          "UID",
                          components.reelBarcode,
                          components.partNo
                        )
                      }
                    >
                      {components.reelBarcode}
                    </a>
                  </td>
                  <td>{components.createTime}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div>
            <Button onClick={prev} disabled={currentPage === 1}>
              <FaIcons.FaStepBackward />
            </Button>
            <Button onClick={next} disabled={currentPage === maxPage}>
              <GiIcons.GiNextButton />
            </Button>
            <div>
              Page {currentPage} of {maxPage}
            </div>
            <h3>Found SMT components: {componentsdata.length}</h3>
          </div>
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
export default PanasonicTable;
