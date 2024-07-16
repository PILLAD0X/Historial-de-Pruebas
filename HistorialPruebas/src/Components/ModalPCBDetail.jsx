import Modal from 'react-bootstrap/Modal';
import ComponentsTable from './ComponentsTable';
import { Button, Form } from 'react-bootstrap';
import * as FaIcons from "react-icons/fa";

function ModalPCBDetail({ show, handleClose }) {

    return (
        <>
            <Modal
                show={show}
                size="xl"
                fullscreen={true}
                onHide={() => handleClose()}
                dialogClassName="modal-90w"
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        Componentes consumidos:
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='buscador'>
                        <Form.Control
                            className="txtbusquedaComponentes"
                            size="text"
                            type="text"
                            placeholder="Ingrese Componente o Unique ID"
                            autoFocus
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
                    <ComponentsTable/>

                </Modal.Body>
            </Modal>
        </>
    );
}

export default ModalPCBDetail;

































/*import {React} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from "sweetalert2";
import withReactContent from 'sweetalert2-react-content';
import "../styles/ShowPcbDetail.css";
import PcbComponentsTables from "./PcbComponentsTable";
const MySwal = withReactContent(Swal);
// BUSCAR COMO EN LUGAR DE QUE SE PONGA HTML COLOCAR UN COMPONENTE .JSX

export const ShowPcbDetails = (props)=> {
    Swal.fire({
        title: 'Componentes usados',
    html: (<PcbComponentsTables/>),
    showConfirmButton: false,
    customClass:{
        popup: 'custom-swal-width'
    },
    didOpen: () => {
      const downloadButton = Swal.getHtmlContainer().querySelector('#downloadButton');
      const closeButton = Swal.getHtmlContainer().querySelector('#closeButton');
      
      downloadButton.addEventListener('click', );
      closeButton.addEventListener('click', () => Swal.close());
    }
    })
};
//export default ShowPcbDetails;*/