import Modal from 'react-bootstrap/Modal';
import ComponentsTable from './ComponentsTables';
import { Button, Form } from 'react-bootstrap';
import * as FaIcons from "react-icons/fa";
import { useState } from 'react';
function ModalPCBDetail({ show, handleClose, triggeredBy, props, technology}) {


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
                    {triggeredBy !== 'Top'  ?
                        <Modal.Title id="example-modal-sizes-title-lg">
                            Componentes consumidos por {props}
                        </Modal.Title>
                    :
                        <Modal.Title id="example-modal-sizes-title-lg">
                            Componentes consumidos por {props}
                        </Modal.Title>
                    }

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
                    
                    <div className="">
                        <ComponentsTable props = {{'triggeredBy' : triggeredBy, 
                                                    'technology': technology
                                                   }
                                                }
                        />

                    </div>

                </Modal.Body>
            </Modal>
        </>
    );
}

export default ModalPCBDetail;