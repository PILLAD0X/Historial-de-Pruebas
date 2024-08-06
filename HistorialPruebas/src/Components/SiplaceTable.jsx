import {React, useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/TableComponents.css'
import axios from "axios";
import Swal from "sweetalert2";
import usePagination from "./Pagination";
import { Button, Form, Spinner } from "react-bootstrap";
import * as FaIcons from "react-icons/fa";
import * as GiIcons from "react-icons/gi";
import ModalPCBProductionBy from "./ModalPCBDetailProductionBy";
const SiplaceTable = (props) => {
    
    const [showModal, setShowModal] = useState(false);
    const [triggeredBy, setTriggeredBy] = useState('');
    const [SearchCriterial, setSearchCriterial] = useState('');
    const [component, setComponent] = useState('');

    const server = process.env.REACT_APP_SERVER_URL;
    const [componentsdata, setComponentsdata] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [loading,setLoading] = useState(false);
    const itemsPerPage = 25; // Cambia esto para ajustar el número de elementos por página
    const { next, prev, currentData, currentPage, maxPage } = usePagination(filteredData, itemsPerPage);
    //console.log(props);
    const GetSiplaceComponents = async(pcb, line) =>{
        // Verificar si ya se tienen los datos para evitar la llamada a la API
        if (componentsdata.length > 0) {
            return;
        }else{
            try {
                setLoading(true);
                const response = await axios.get(`${server}/api/siplacecomponents?serialnumber=${pcb}&smtLine=${line}`);
                if (response.data.length === 0 || response === undefined || response.data[0].parent ==='') {
                    setLoading(false);
                    Swal.fire({
                        position: "center",
                        icon: "warning",
                        title: `No se encontraron Componentes consumidos por el PCB, ${props.PCB}.`,
                        showConfirmButton: false,
                        timer: 1400
                    });
        
                }else{
                    setLoading(false)
                    setComponentsdata(response.data)
                    if(props.PCBSide === 'Top'){
                        props.setTopSmtComponents(response.data)
                    }else{
                        props.setbottomSmtComponents(response.data)
                    }
                }
            } catch (error) {
                console.log(error);
                setLoading(false)
                throw error;
            }
        }

    }

    useEffect(() =>{
        GetSiplaceComponents(props.PCB,props.mfgLine);
    },[props.PCB,props.mfgLine]);

    // Filtrar datos cuando el término de búsqueda cambia
    useEffect(() => {
        const results = componentsdata.filter(component =>
            Object.values(component).some(value =>
                value.toString().toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
        setFilteredData(results);
    }, [searchTerm, componentsdata]);

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleLinkClick = (event, btnclicked, searchCriterial, component) => {
        event.preventDefault();
        setShowModal(true);
        setTriggeredBy(btnclicked);
        setSearchCriterial(searchCriterial)
        setComponent(component)
        //console.log('CLick');
    };
    return (
        
        <div className="table-responsive CTitulos ">

            {loading === true ? (
                <Spinner id="loading SMT Top" animation="border" className="espaciadoVertical"/>
            ): componentsdata.length === 0 ?
            (
                <div className="a">
                    <h1><FaIcons.FaExclamationTriangle/></h1>
                   <h3>No se encontraron componentes consumidos por {props.PCB} en SMT.</h3>   
                </div>
            ) : (
                <div>
                    <div className='buscador'>
                        <Form.Control
                            className="txtbusquedaComponentes"
                            size="text"
                            type="text"
                            placeholder="Search Component Number or Unique ID"
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
                    <table className='table table-hover table-sm table-striped scroll'>
                        <thead className="table-dark CTitulos">
                            <tr key={0}>
                                <th>Location</th>
                                <th>Packaging Unit</th>
                                <th>Schematic</th>
                                <th>Unique ID</th>
                                <th>Component Number</th>
                                <th>Lot Vendor</th>
                                <th>Vendor</th>
                                <th>Feader Number</th>
                                <th>Feader Side</th>
                                <th>Board Side</th>
                                <th>Lot Started Date</th>
                                <th>Lot End Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentData().map((components) => (
                                <tr key={components.smtTraceabilityId}>
                                    <td>{components.locationId}</td>
                                    <td>{components.packagingUnitId}</td>
                                    <td>{components.schematic}</td>
                                    <td><a href="#" title="Show PCBs creared by this Unique ID" key={components.smtTraceabilityId} onClick={(e)=> handleLinkClick(e,'UID',components.packagingUniqueId,components.rawComponentBarcode)}>{components.packagingUniqueId}</a></td>
                                    <td>{components.rawComponentBarcode}</td>
                                    <td><a href="#" title="Show PCBs creared by this Lot" key={components.smtTraceabilityId} onClick={(e)=> handleLinkClick(e, 'Lot',components.lotVendor,components.rawComponentBarcode)}>{components.lotVendor}</a></td>
                                    <td>{components.supplier}</td>
                                    <td>{components.fdrNumber}</td>
                                    <td>{components.fdrSide}</td>
                                    <td>{components.boardSide}</td>
                                    <td>{components.beginDate}</td>
                                    <td>{components.endDate}</td>
                                </tr>

                            ))}
                        </tbody>
                    </table>
                    <div>
                        <Button 
                        onClick={prev} 
                        disabled={currentPage === 1}>
                            
                            <FaIcons.FaStepBackward/>
                        </Button>
                        <Button onClick={next} disabled={currentPage === maxPage}>
                            <GiIcons.GiNextButton/>
                        </Button>
                        <div>
                            Page {currentPage} of {maxPage}
                        </div>
                    </div>
                    <ModalPCBProductionBy show={showModal} handleClose={handleCloseModal} triggeredBy = {triggeredBy} searchCriterial = {SearchCriterial} component={component}/>
                </div>
            )}


        </div>
    )
};
export default SiplaceTable;