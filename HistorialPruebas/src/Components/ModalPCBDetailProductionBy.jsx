import Modal from "react-bootstrap/Modal";
import "../styles/ModalPCBDetailProduction.css";
import { Button, Spinner } from "react-bootstrap";
import * as FaIcons from "react-icons/fa";
import * as GiIcons from "react-icons/gi";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import usePagination from "./Pagination";
import * as XLSX from "xlsx/xlsx.mjs";
function ModalPCBProductionBy({
  show,
  handleClose,
  triggeredBy,
  searchCriterial,
  component,
}) {
  //console.log('Search Criterial: ' +searchCriterial+ ' Component: ' +component)

  const [PCBs, setPCBs] = useState([]);
  const [loading, setLoading] = useState(false);
  const itemsPerPage = 100; // Cambia esto para ajustar el número de elementos por página
  const { next, prev, currentData, currentPage, maxPage } = usePagination(
    PCBs,
    itemsPerPage
  );

  const server = process.env.REACT_APP_SERVER_URL;

  const GetPCBsByLot = async (lot) => {
    //console.log('POSITIVO');

    // Verificar si ya se tienen los datos para evitar la llamada a la API

    try {
      setLoading(true);
      const response = await axios.get(
        `${server}/api/PcbsManufacturedByLot?lot=${lot}&Material=${component}`
      );
      if (
        response.data.length === 0 ||
        response === undefined ||
        response.data[0].parent === ""
      ) {
        Swal.fire({
          position: "center",
          icon: "warning",
          title: `No se encontraron PCBs creados con el Lote, ${lot}.`,
          showConfirmButton: false,
          timer: 3000,
        });
        setLoading(false);
      } else {
        setPCBs(response.data);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      throw error;
    }
  };

  const GetPCBsByUID = async (uid) => {
    //console.log('POSITIVO');

    // Verificar si ya se tienen los datos para evitar la llamada a la API

    try {
      setLoading(true);

      const response = await axios.get(
        `${server}/api/PcbsManufacturedByUID?UID=${uid}&Material=${component}`
      );
      if (
        response.data.length === 0 ||
        response === undefined ||
        response.data[0].parent === ""
      ) {
        Swal.fire({
          position: "center",
          icon: "warning",
          title: `No se encontraron PCBs creados con el UID, ${uid}.`,
          showConfirmButton: false,
          timer: 3000,
        });
        setLoading(false);
      } else {
        setPCBs(response.data);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      throw error;
    }
  };

  useEffect(() => {
    if (triggeredBy === "UID") {
      GetPCBsByUID(searchCriterial);
    } else {
      GetPCBsByLot(searchCriterial);
    }
  }, [triggeredBy, searchCriterial]);

  //Metodo que sirve para exportar los datos a Excel.
  const exportToExcel = () => {
    const ws = Array.isArray(PCBs) ? XLSX.utils.json_to_sheet(PCBs) : null;
    const wb = XLSX.utils.book_new();

    //validamos si existen datos de prueba guardados en las varibles para generar las hojas de excel.
    if ((PCBs.length > 0) & (triggeredBy === "UID")) {
      XLSX.utils.book_append_sheet(wb, ws, `PCBs from UID ${searchCriterial}`);
    } else {
      XLSX.utils.book_append_sheet(wb, ws, `PCBs from Lot ${searchCriterial}`);
    }

    if ((PCBs.length > 0) & (triggeredBy === "Lot")) {
      XLSX.writeFile(wb, `PCBs Manufactured by Lot ${searchCriterial} .xlsx`);
    } else {
      XLSX.writeFile(wb, `PCBs Manufactured by UID ${searchCriterial} .xlsx`);
    }
  };

  return (
    <>
      <Modal
        show={show}
        size="sm"
        fullscreen={true}
        onHide={() => (handleClose(), setPCBs([]), setLoading(false))}
        dialogClassName="modal-90w"
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          {triggeredBy !== "UID" ? (
            <Modal.Title id="example-modal-sizes-title-lg">
              PCB's manufactured with the Lot {searchCriterial} of the component{" "}
              {component}
            </Modal.Title>
          ) : (
            <Modal.Title id="example-modal-sizes-title-lg">
              PCB's manufactured with the UID {searchCriterial}
            </Modal.Title>
          )}
        </Modal.Header>
        <Modal.Body>
          <div className="divTable center">
            {loading === true ? (
              <Spinner
                id="loading SMT Top"
                animation="border"
                className="espaciadoVertical"
              />
            ) : (
              <>
                <table className="table table-hover table-sm table-striped scroll TableWhidth">
                  <thead className="table-dark CTitulos">
                    <tr key={0}>
                      <th>Barcode</th>
                    </tr>
                  </thead>
                  <tbody className="Tablecontent">
                    {currentData().map((components) => (
                      <tr key={components.barcode}>
                        <td>{components.barcode}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="table-responsive CTitulos ">
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
                  </div>

                  <h2>Found PCBs:{PCBs.length} </h2>

                  <div className="">
                    <Button
                      className=""
                      variant="primary"
                      title="Export Data"
                      id="input"
                      onClick={exportToExcel}
                    >
                      Download Serials <FaIcons.FaDownload />
                    </Button>
                  </div>
                </div>
              </>
            )}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ModalPCBProductionBy;
