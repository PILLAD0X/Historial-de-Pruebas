import {React, useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/TableComponents.css'
import usePagination from "./Pagination";
import axios from "axios";
import Swal from "sweetalert2";
import { Button, Form, Spinner } from "react-bootstrap";
import * as FaIcons from "react-icons/fa";

const PanasonicTable = (props) => {
    //console.log(props);
    const server = process.env.REACT_APP_SERVER_URL;
    const [componentsdata, setComponentsdata] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [loading,setLoading] = useState(false);
    const itemsPerPage = 25; // Cambia esto para ajustar el número de elementos por página
    const { next, prev, currentData, currentPage, maxPage } = usePagination(filteredData, itemsPerPage);

    const GetPanasonicComponents = async(pcb) => {
        // Verificar si ya se tienen los datos para evitar la llamada a la API
        if (componentsdata.length > 0) {
            return;
        }else{
            const SerialNumberP1 = pcb.slice(0,9);
            const SerialNumberP2 = pcb.slice(11,23);
            try {
                setLoading(true);
                const response = await axios.get(`${server}/api/PanasonicComponents?serialnumberP1=${SerialNumberP1}&serialnumberP2=${SerialNumberP2}`);
                if (response.data.length === 0 || response === undefined || response.data[0].parent ==='') {
                    setLoading(false);
                    Swal.fire({
                        position: "center",
                        icon: "warning",
                        title: `No se encontraron Componentes consumidos por el PCB, ${pcb}`,
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
        GetPanasonicComponents(props.PCB);
    },[props.PCB]);

    // Filtrar datos cuando el término de búsqueda cambia
    useEffect(() => {
        const results = componentsdata.filter(component =>
            Object.values(component).some(value =>
                value.toString().toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
        setFilteredData(results);
    }, [searchTerm, componentsdata]);
    return (
        <div className="table-responsive CTitulos ">
            {loading=== true ? (
                <Spinner id="loading SMT Top" animation="border" className="espaciadoVertical"/>
            ): componentsdata.length === 0 ?
            (
                <div>
                    <h1><FaIcons.FaExclamationTriangle/></h1>
                   <h3>No se encontraron componentes consumidos por {props.PCB}.</h3>   
                </div>
            ) : (
                <div>
                    <div className='buscador'>
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
                    <table className='table table-hover table-sm table-striped scroll'>
                        <thead className="table-dark CTitulos">
                            <tr key={componentsdata.SmtTraceabilityPanasonicId}>
                                <th>Serial Number</th>
                                <th>Reel Id</th>
                                <th>Part No</th>
                                <th>Vendor No</th>
                                <th>Lot No</th>
                                <th>Reel Serial</th>
                                <th>Date Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentData().map((components) => (
                                <tr>
                                    <td>{components.barcode}</td>
                                    <td>{components.reelId}</td>
                                    <td>{components.partNo}</td>
                                    <td>{components.vendorNo}</td>
                                    <td>{components.lotNo}</td>
                                    <td>{components.reelBarcode}</td>
                                    <td>{components.createTime}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
};
export default PanasonicTable;