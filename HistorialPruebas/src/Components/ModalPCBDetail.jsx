import Modal from 'react-bootstrap/Modal';
import ComponentsTable from './ComponentsTables';
function ModalPCBDetail({ show, handleClose, triggeredBy, pcb, technology,mfgLine}) {


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
                            Componentes consumidos por numero de serie: {pcb}
                        </Modal.Title>
                    :
                        <Modal.Title id="example-modal-sizes-title-lg">
                            Componentes consumidos por numero de serie: {pcb}
                        </Modal.Title>
                    }
                </Modal.Header>
                <Modal.Body>

                    
                    <div className="">
                        <ComponentsTable props = {{'triggeredBy' : triggeredBy, 
                                                    'technology': technology,
                                                    'PCB' : pcb,
                                                    'mfgLine' : mfgLine
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