import Modal from 'react-bootstrap/Modal';
import '../styles/ModalPCBDetailProduction.css';
import { Form, Button} from 'react-bootstrap';
import * as FaIcons from "react-icons/fa";
import { useState } from 'react';
function ModalPCBProductionBy({ show, handleClose, triggeredBy, searchCriterial, component}) {
    const [PCBs, setPCBs] = useState(['']);


    return (
        <>
            <Modal
                show={show}
                size="sm"
                fullscreen={true}
                onHide={() => handleClose()}
                dialogClassName="modal-90w"
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header closeButton>
                    {triggeredBy !== 'UID'  ?
                        <Modal.Title id="example-modal-sizes-title-lg">
                            PCB's manufactured with the Lot {searchCriterial} of the component {component}
                        </Modal.Title>
                    :
                        <Modal.Title id="example-modal-sizes-title-lg">
                            PCB's manufactured with the UID {searchCriterial}
                        </Modal.Title>
                    }
                </Modal.Header>
                <Modal.Body>    

                    
                    <div className="divTable">
                        {triggeredBy !== 'UID'  ?
                            <table className='table table-hover table-sm table-striped scroll TableWhidth'>
                                <thead className="table-dark CTitulos">
                                    <tr key={0}>
                                        <th>Barcode</th>
                                    </tr>
                                </thead>
                                <tbody className='Tablecontent'>
                                    <tr key='#'>
                                        <td>F3219087101884120091010</td>
                                    </tr>
                                    <tr key='#'>
                                        <td>F3219087101884120091010</td>
                                    </tr>
                                    <tr key='#'>
                                        <td>F3219087101884120091010</td>
                                    </tr>
                                    <tr key='#'>
                                        <td>F3219087101884120091010</td>
                                    </tr>
                                    <tr key='#'>
                                        <td>F3219087101884120091010</td>
                                    </tr>
                                    <tr key='#'>
                                        <td>F3219087101884120091010</td>
                                    </tr>
                                    <tr key='#'>
                                        <td>F3219087101884120091010</td>
                                    </tr>
                                    <tr key='#'>
                                        <td>F3219087101884120091010</td>
                                    </tr>
                                    <tr key='#'>
                                        <td>F3219087101884120091010</td>
                                    </tr>
                                    <tr key='#'>
                                        <td>F3219087101884120091010</td>
                                    </tr>
                                    <tr key='#'>
                                        <td>F3219087101884120091010</td>
                                    </tr>
                                    <tr key='#'>
                                        <td>F3219087101884120091010</td>
                                    </tr>
                                    <tr key='#'>
                                        <td>F3219087101884120091010</td>
                                    </tr>
                                    <tr key='#'>
                                        <td>F3219087101884120091010</td>
                                    </tr>
                                    <tr key='#'>
                                        <td>F3219087101884120091010</td>
                                    </tr>
                                    <tr key='#'>
                                        <td>F3219087101884120091010</td>
                                    </tr>
                                    <tr key='#'>
                                        <td>F3219087101884120091010</td>
                                    </tr>
                                    <tr key='#'>
                                        <td>F3219087101884120091010</td>
                                    </tr>
                                    <tr key='#'>
                                        <td>F3219087101884120091010</td>
                                    </tr>
                                    <tr key='#'>
                                        <td>F3219087101884120091010</td>
                                    </tr>
                                    <tr key='#'>
                                        <td>F3219087101884120091010</td>
                                    </tr>
                                    <tr key='#'>
                                        <td>F3219087101884120091010</td>
                                    </tr>
                                    <tr key='#'>
                                        <td>F3219087101884120091010</td>
                                    </tr>
                                    <tr key='#'>
                                        <td>F3219087101884120091010</td>
                                    </tr>
                                    <tr key='#'>
                                        <td>F3219087101884120091010</td>
                                    </tr>
                                    <tr key='#'>
                                        <td>F3219087101884120091010</td>
                                    </tr>
                                    <tr key='#'>
                                        <td>F3219087101884120091010</td>
                                    </tr>
                                    <tr key='#'>
                                        <td>F3219087101884120091010</td>
                                    </tr>
                                    <tr key='#'>
                                        <td>F3219087101884120091010</td>
                                    </tr>
                                </tbody>
                            </table>
                        :
                        <table className='table table-hover table-sm table-striped scroll TableWhidth'>
                            <thead className="table-dark CTitulos">
                                <tr key={0}>
                                    <th>Barcode</th>
                                </tr>
                            </thead>
                            <tbody className='Tablecontent'>
                                <tr key='#'>
                                    <td>F3219087101884120091010</td>
                                </tr>
                                <tr key='#'>
                                    <td>F3219087101884120091010</td>
                                </tr>
                                <tr key='#'>
                                    <td>F3219087101884120091010</td>
                                </tr>
                                <tr key='#'>
                                    <td>F3219087101884120091010</td>
                                </tr>
                                <tr key='#'>
                                    <td>F3219087101884120091010</td>
                                </tr>
                                <tr key='#'>
                                    <td>F3219087101884120091010</td>
                                </tr>
                                <tr key='#'>
                                    <td>F3219087101884120091010</td>
                                </tr>
                                <tr key='#'>
                                    <td>F3219087101884120091010</td>
                                </tr>
                                <tr key='#'>
                                    <td>F3219087101884120091010</td>
                                </tr>
                                <tr key='#'>
                                    <td>F3219087101884120091010</td>
                                </tr>
                                <tr key='#'>
                                    <td>F3219087101884120091010</td>
                                </tr>
                                <tr key='#'>
                                    <td>F3219087101884120091010</td>
                                </tr>
                                <tr key='#'>
                                    <td>F3219087101884120091010</td>
                                </tr>
                                <tr key='#'>
                                    <td>F3219087101884120091010</td>
                                </tr>
                                <tr key='#'>
                                    <td>F3219087101884120091010</td>
                                </tr>
                                <tr key='#'>
                                    <td>F3219087101884120091010</td>
                                </tr>
                                <tr key='#'>
                                    <td>F3219087101884120091010</td>
                                </tr>
                                <tr key='#'>
                                    <td>F3219087101884120091010</td>
                                </tr>
                                <tr key='#'>
                                    <td>F3219087101884120091010</td>
                                </tr>
                                <tr key='#'>
                                    <td>F3219087101884120091010</td>
                                </tr>
                                <tr key='#'>
                                    <td>F3219087101884120091010</td>
                                </tr>
                                <tr key='#'>
                                    <td>F3219087101884120091010</td>
                                </tr>
                                <tr key='#'>
                                    <td>F3219087101884120091010</td>
                                </tr>
                                <tr key='#'>
                                    <td>F3219087101884120091010</td>
                                </tr>
                                <tr key='#'>
                                    <td>F3219087101884120091010</td>
                                </tr>
                                <tr key='#'>
                                    <td>F3219087101884120091010</td>
                                </tr>
                                <tr key='#'>
                                    <td>F3219087101884120091010</td>
                                </tr>
                                <tr key='#'>
                                    <td>F3219087101884120091010</td>
                                </tr>
                                <tr key='#'>
                                    <td>F3219087101884120091010</td>
                                </tr>
                            </tbody>
                        </table>
                        }
                    </div>
                    <div className="table-responsive CTitulos ">
                            <div className="">
                                <Button
                                    className=""
                                    variant="primary"
                                    title="Export Data"
                                    id="input"
                                //onClick={exportToExcel}
                                >
                                    Download Components <FaIcons.FaDownload />
                                </Button>
                            </div>
                        </div>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default ModalPCBProductionBy;