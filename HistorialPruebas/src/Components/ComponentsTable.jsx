import {React, useState} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/TableComponents.css'
import { Button } from "react-bootstrap";

import * as FaIcons from "react-icons/fa";
const ComponentsTable = () => {
    return (
        <div className="table-responsive CTitulos scroll">
            <h1>SMT</h1>
            <table className='table table-hover table-sm table-striped'>
                <thead className="table-dark CTitulos">
                    <tr key={0}>
                        <th>Serial Number</th>
                        <th>Trace Data</th>
                        <th>Location</th>
                        <th>Packaging Unit</th>
                        <th>Schematic</th>
                        <th>Packaging Unique</th>
                        <th>Component Number</th>
                        <th>Lot Vendor</th>
                        <th>Supplier</th>
                        <th>Feader Number</th>
                        <th>Feader Side</th>

                        <th>Board Side</th>
                        <th>Lot Started Date</th>
                        <th>Lot End Date</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>F4189855508853844620002</td>
                        <td>802106</td>
                        <td>19907</td>
                        <td>54773</td>
                        <td>R135_5</td>
                        <td>1084481446</td>
                        <td>801581-2003F</td>
                        <td>7706T028</td>
                        <td>2003377</td>
                        <td>33</td>
                        <td>2</td>
                        <td>B</td>
                        <td>2024-06-07 16:46:06.637</td>
                        <td>2024-07-08 00:10:41.113</td>
                    </tr>
                    <tr>
                        <td>F4189855508853844620002</td>
                        <td>802106</td>
                        <td>19907</td>
                        <td>54773</td>
                        <td>R135_5</td>
                        <td>1084481446</td>
                        <td>801581-2003F</td>
                        <td>7706T028</td>
                        <td>2003377</td>
                        <td>33</td>
                        <td>2</td>
                        <td>B</td>
                        <td>2024-06-07 16:46:06.637</td>
                        <td>2024-07-08 00:10:41.113</td>
                    </tr>
                    <tr>
                        <td>F4189855508853844620002</td>
                        <td>802106</td>
                        <td>19907</td>
                        <td>54773</td>
                        <td>R135_5</td>
                        <td>1084481446</td>
                        <td>801581-2003F</td>
                        <td>7706T028</td>
                        <td>2003377</td>
                        <td>33</td>
                        <td>2</td>
                        <td>B</td>
                        <td>2024-06-07 16:46:06.637</td>
                        <td>2024-07-08 00:10:41.113</td>
                    </tr>
                    <tr>
                        <td>F4189855508853844620002</td>
                        <td>802106</td>
                        <td>19907</td>
                        <td>54773</td>
                        <td>R135_5</td>
                        <td>1084481446</td>
                        <td>801581-2003F</td>
                        <td>7706T028</td>
                        <td>2003377</td>
                        <td>33</td>
                        <td>2</td>
                        <td>B</td>
                        <td>2024-06-07 16:46:06.637</td>
                        <td>2024-07-08 00:10:41.113</td>
                    </tr>
                    <tr>
                        <td>F4189855508853844620002</td>
                        <td>802106</td>
                        <td>19907</td>
                        <td>54773</td>
                        <td>R135_5</td>
                        <td>1084481446</td>
                        <td>801581-2003F</td>
                        <td>7706T028</td>
                        <td>2003377</td>
                        <td>33</td>
                        <td>2</td>
                        <td>B</td>
                        <td>2024-06-07 16:46:06.637</td>
                        <td>2024-07-08 00:10:41.113</td>
                    </tr>
                    <tr>
                        <td>F4189855508853844620002</td>
                        <td>802106</td>
                        <td>19907</td>
                        <td>54773</td>
                        <td>R135_5</td>
                        <td>1084481446</td>
                        <td>801581-2003F</td>
                        <td>7706T028</td>
                        <td>2003377</td>
                        <td>33</td>
                        <td>2</td>
                        <td>B</td>
                        <td>2024-06-07 16:46:06.637</td>
                        <td>2024-07-08 00:10:41.113</td>
                    </tr>
                    <tr>
                        <td>F4189855508853844620002</td>
                        <td>802106</td>
                        <td>19907</td>
                        <td>54773</td>
                        <td>R135_5</td>
                        <td>1084481446</td>
                        <td>801581-2003F</td>
                        <td>7706T028</td>
                        <td>2003377</td>
                        <td>33</td>
                        <td>2</td>
                        <td>B</td>
                        <td>2024-06-07 16:46:06.637</td>
                        <td>2024-07-08 00:10:41.113</td>
                    </tr>
                    <tr>
                        <td>F4189855508853844620002</td>
                        <td>802106</td>
                        <td>19907</td>
                        <td>54773</td>
                        <td>R135_5</td>
                        <td>1084481446</td>
                        <td>801581-2003F</td>
                        <td>7706T028</td>
                        <td>2003377</td>
                        <td>33</td>
                        <td>2</td>
                        <td>B</td>
                        <td>2024-06-07 16:46:06.637</td>
                        <td>2024-07-08 00:10:41.113</td>
                    </tr>
                    <tr>
                        <td>F4189855508853844620002</td>
                        <td>802106</td>
                        <td>19907</td>
                        <td>54773</td>
                        <td>R135_5</td>
                        <td>1084481446</td>
                        <td>801581-2003F</td>
                        <td>7706T028</td>
                        <td>2003377</td>
                        <td>33</td>
                        <td>2</td>
                        <td>B</td>
                        <td>2024-06-07 16:46:06.637</td>
                        <td>2024-07-08 00:10:41.113</td>
                    </tr>
                    <tr>
                        <td>F4189855508853844620002</td>
                        <td>802106</td>
                        <td>19907</td>
                        <td>54773</td>
                        <td>R135_5</td>
                        <td>1084481446</td>
                        <td>801581-2003F</td>
                        <td>7706T028</td>
                        <td>2003377</td>
                        <td>33</td>
                        <td>2</td>
                        <td>B</td>
                        <td>2024-06-07 16:46:06.637</td>
                        <td>2024-07-08 00:10:41.113</td>
                    </tr>
                    <tr>
                        <td>F4189855508853844620002</td>
                        <td>802106</td>
                        <td>19907</td>
                        <td>54773</td>
                        <td>R135_5</td>
                        <td>1084481446</td>
                        <td>801581-2003F</td>
                        <td>7706T028</td>
                        <td>2003377</td>
                        <td>33</td>
                        <td>2</td>
                        <td>B</td>
                        <td>2024-06-07 16:46:06.637</td>
                        <td>2024-07-08 00:10:41.113</td>
                    </tr>
                    <tr>
                        <td>F4189855508853844620002</td>
                        <td>802106</td>
                        <td>19907</td>
                        <td>54773</td>
                        <td>R135_5</td>
                        <td>1084481446</td>
                        <td>801581-2003F</td>
                        <td>7706T028</td>
                        <td>2003377</td>
                        <td>33</td>
                        <td>2</td>
                        <td>B</td>
                        <td>2024-06-07 16:46:06.637</td>
                        <td>2024-07-08 00:10:41.113</td>
                    </tr>
                    <tr>
                        <td>F4189855508853844620002</td>
                        <td>802106</td>
                        <td>19907</td>
                        <td>54773</td>
                        <td>R135_5</td>
                        <td>1084481446</td>
                        <td>801581-2003F</td>
                        <td>7706T028</td>
                        <td>2003377</td>
                        <td>33</td>
                        <td>2</td>
                        <td>B</td>
                        <td>2024-06-07 16:46:06.637</td>
                        <td>2024-07-08 00:10:41.113</td>
                    </tr>
                    <tr>
                        <td>F4189855508853844620002</td>
                        <td>802106</td>
                        <td>19907</td>
                        <td>54773</td>
                        <td>R135_5</td>
                        <td>1084481446</td>
                        <td>801581-2003F</td>
                        <td>7706T028</td>
                        <td>2003377</td>
                        <td>33</td>
                        <td>2</td>
                        <td>B</td>
                        <td>2024-06-07 16:46:06.637</td>
                        <td>2024-07-08 00:10:41.113</td>
                    </tr>
                    <tr>
                        <td>F4189855508853844620002</td>
                        <td>802106</td>
                        <td>19907</td>
                        <td>54773</td>
                        <td>R135_5</td>
                        <td>1084481446</td>
                        <td>801581-2003F</td>
                        <td>7706T028</td>
                        <td>2003377</td>
                        <td>33</td>
                        <td>2</td>
                        <td>B</td>
                        <td>2024-06-07 16:46:06.637</td>
                        <td>2024-07-08 00:10:41.113</td>
                    </tr>
                    <tr>
                        <td>F4189855508853844620002</td>
                        <td>802106</td>
                        <td>19907</td>
                        <td>54773</td>
                        <td>R135_5</td>
                        <td>1084481446</td>
                        <td>801581-2003F</td>
                        <td>7706T028</td>
                        <td>2003377</td>
                        <td>33</td>
                        <td>2</td>
                        <td>B</td>
                        <td>2024-06-07 16:46:06.637</td>
                        <td>2024-07-08 00:10:41.113</td>
                    </tr>
                    <tr>
                        <td>F4189855508853844620002</td>
                        <td>802106</td>
                        <td>19907</td>
                        <td>54773</td>
                        <td>R135_5</td>
                        <td>1084481446</td>
                        <td>801581-2003F</td>
                        <td>7706T028</td>
                        <td>2003377</td>
                        <td>33</td>
                        <td>2</td>
                        <td>B</td>
                        <td>2024-06-07 16:46:06.637</td>
                        <td>2024-07-08 00:10:41.113</td>
                    </tr>
                    <tr>
                        <td>F4189855508853844620002</td>
                        <td>802106</td>
                        <td>19907</td>
                        <td>54773</td>
                        <td>R135_5</td>
                        <td>1084481446</td>
                        <td>801581-2003F</td>
                        <td>7706T028</td>
                        <td>2003377</td>
                        <td>33</td>
                        <td>2</td>
                        <td>B</td>
                        <td>2024-06-07 16:46:06.637</td>
                        <td>2024-07-08 00:10:41.113</td>
                    </tr>
                </tbody>
            </table>

            <h1>THT</h1>
            <table className='table table-hover table-sm table-striped'>
                <thead className="table-dark CTitulos">
                    <tr key={0}>
                        <th>Serial Number</th>
                        <th>MID</th>
                        <th>Lot Vendor</th>
                        <th>Part Number</th>

                        <th>Line</th>
                        <th>Unique ID</th>
                        <th>Component Number</th>
                        <th>Lot Vendor</th>
                        <th>Supplier</th>
                        <th>Feader Number</th>
                        <th>Feader Side</th>

                        <th>Board Side</th>
                        <th>Lot Started Date</th>
                        <th>Lot End Date</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>F4189855508853844620002</td>
                        <td>802106</td>
                        <td>19907</td>
                        <td>54773</td>
                        <td>R135_5</td>
                        <td>1084481446</td>
                        <td>801581-2003F</td>
                        <td>7706T028</td>
                        <td>2003377</td>
                        <td>33</td>
                        <td>2</td>
                        <td>B</td>
                        <td>2024-06-07 16:46:06.637</td>
                        <td>2024-07-08 00:10:41.113</td>
                    </tr>
                    <tr>
                        <td>F4189855508853844620002</td>
                        <td>802106</td>
                        <td>19907</td>
                        <td>54773</td>
                        <td>R135_5</td>
                        <td>1084481446</td>
                        <td>801581-2003F</td>
                        <td>7706T028</td>
                        <td>2003377</td>
                        <td>33</td>
                        <td>2</td>
                        <td>B</td>
                        <td>2024-06-07 16:46:06.637</td>
                        <td>2024-07-08 00:10:41.113</td>
                    </tr>
                    <tr>
                        <td>F4189855508853844620002</td>
                        <td>802106</td>
                        <td>19907</td>
                        <td>54773</td>
                        <td>R135_5</td>
                        <td>1084481446</td>
                        <td>801581-2003F</td>
                        <td>7706T028</td>
                        <td>2003377</td>
                        <td>33</td>
                        <td>2</td>
                        <td>B</td>
                        <td>2024-06-07 16:46:06.637</td>
                        <td>2024-07-08 00:10:41.113</td>
                    </tr>
                    <tr>
                        <td>F4189855508853844620002</td>
                        <td>802106</td>
                        <td>19907</td>
                        <td>54773</td>
                        <td>R135_5</td>
                        <td>1084481446</td>
                        <td>801581-2003F</td>
                        <td>7706T028</td>
                        <td>2003377</td>
                        <td>33</td>
                        <td>2</td>
                        <td>B</td>
                        <td>2024-06-07 16:46:06.637</td>
                        <td>2024-07-08 00:10:41.113</td>
                    </tr>
                    <tr>
                        <td>F4189855508853844620002</td>
                        <td>802106</td>
                        <td>19907</td>
                        <td>54773</td>
                        <td>R135_5</td>
                        <td>1084481446</td>
                        <td>801581-2003F</td>
                        <td>7706T028</td>
                        <td>2003377</td>
                        <td>33</td>
                        <td>2</td>
                        <td>B</td>
                        <td>2024-06-07 16:46:06.637</td>
                        <td>2024-07-08 00:10:41.113</td>
                    </tr>
                    <tr>
                        <td>F4189855508853844620002</td>
                        <td>802106</td>
                        <td>19907</td>
                        <td>54773</td>
                        <td>R135_5</td>
                        <td>1084481446</td>
                        <td>801581-2003F</td>
                        <td>7706T028</td>
                        <td>2003377</td>
                        <td>33</td>
                        <td>2</td>
                        <td>B</td>
                        <td>2024-06-07 16:46:06.637</td>
                        <td>2024-07-08 00:10:41.113</td>
                    </tr>
                    <tr>
                        <td>F4189855508853844620002</td>
                        <td>802106</td>
                        <td>19907</td>
                        <td>54773</td>
                        <td>R135_5</td>
                        <td>1084481446</td>
                        <td>801581-2003F</td>
                        <td>7706T028</td>
                        <td>2003377</td>
                        <td>33</td>
                        <td>2</td>
                        <td>B</td>
                        <td>2024-06-07 16:46:06.637</td>
                        <td>2024-07-08 00:10:41.113</td>
                    </tr>
                    <tr>
                        <td>F4189855508853844620002</td>
                        <td>802106</td>
                        <td>19907</td>
                        <td>54773</td>
                        <td>R135_5</td>
                        <td>1084481446</td>
                        <td>801581-2003F</td>
                        <td>7706T028</td>
                        <td>2003377</td>
                        <td>33</td>
                        <td>2</td>
                        <td>B</td>
                        <td>2024-06-07 16:46:06.637</td>
                        <td>2024-07-08 00:10:41.113</td>
                    </tr>
                    <tr>
                        <td>F4189855508853844620002</td>
                        <td>802106</td>
                        <td>19907</td>
                        <td>54773</td>
                        <td>R135_5</td>
                        <td>1084481446</td>
                        <td>801581-2003F</td>
                        <td>7706T028</td>
                        <td>2003377</td>
                        <td>33</td>
                        <td>2</td>
                        <td>B</td>
                        <td>2024-06-07 16:46:06.637</td>
                        <td>2024-07-08 00:10:41.113</td>
                    </tr>
                    <tr>
                        <td>F4189855508853844620002</td>
                        <td>802106</td>
                        <td>19907</td>
                        <td>54773</td>
                        <td>R135_5</td>
                        <td>1084481446</td>
                        <td>801581-2003F</td>
                        <td>7706T028</td>
                        <td>2003377</td>
                        <td>33</td>
                        <td>2</td>
                        <td>B</td>
                        <td>2024-06-07 16:46:06.637</td>
                        <td>2024-07-08 00:10:41.113</td>
                    </tr>
                    <tr>
                        <td>F4189855508853844620002</td>
                        <td>802106</td>
                        <td>19907</td>
                        <td>54773</td>
                        <td>R135_5</td>
                        <td>1084481446</td>
                        <td>801581-2003F</td>
                        <td>7706T028</td>
                        <td>2003377</td>
                        <td>33</td>
                        <td>2</td>
                        <td>B</td>
                        <td>2024-06-07 16:46:06.637</td>
                        <td>2024-07-08 00:10:41.113</td>
                    </tr>
                    <tr>
                        <td>F4189855508853844620002</td>
                        <td>802106</td>
                        <td>19907</td>
                        <td>54773</td>
                        <td>R135_5</td>
                        <td>1084481446</td>
                        <td>801581-2003F</td>
                        <td>7706T028</td>
                        <td>2003377</td>
                        <td>33</td>
                        <td>2</td>
                        <td>B</td>
                        <td>2024-06-07 16:46:06.637</td>
                        <td>2024-07-08 00:10:41.113</td>
                    </tr>
                    <tr>
                        <td>F4189855508853844620002</td>
                        <td>802106</td>
                        <td>19907</td>
                        <td>54773</td>
                        <td>R135_5</td>
                        <td>1084481446</td>
                        <td>801581-2003F</td>
                        <td>7706T028</td>
                        <td>2003377</td>
                        <td>33</td>
                        <td>2</td>
                        <td>B</td>
                        <td>2024-06-07 16:46:06.637</td>
                        <td>2024-07-08 00:10:41.113</td>
                    </tr>
                    <tr>
                        <td>F4189855508853844620002</td>
                        <td>802106</td>
                        <td>19907</td>
                        <td>54773</td>
                        <td>R135_5</td>
                        <td>1084481446</td>
                        <td>801581-2003F</td>
                        <td>7706T028</td>
                        <td>2003377</td>
                        <td>33</td>
                        <td>2</td>
                        <td>B</td>
                        <td>2024-06-07 16:46:06.637</td>
                        <td>2024-07-08 00:10:41.113</td>
                    </tr>
                    <tr>
                        <td>F4189855508853844620002</td>
                        <td>802106</td>
                        <td>19907</td>
                        <td>54773</td>
                        <td>R135_5</td>
                        <td>1084481446</td>
                        <td>801581-2003F</td>
                        <td>7706T028</td>
                        <td>2003377</td>
                        <td>33</td>
                        <td>2</td>
                        <td>B</td>
                        <td>2024-06-07 16:46:06.637</td>
                        <td>2024-07-08 00:10:41.113</td>
                    </tr>
                    <tr>
                        <td>F4189855508853844620002</td>
                        <td>802106</td>
                        <td>19907</td>
                        <td>54773</td>
                        <td>R135_5</td>
                        <td>1084481446</td>
                        <td>801581-2003F</td>
                        <td>7706T028</td>
                        <td>2003377</td>
                        <td>33</td>
                        <td>2</td>
                        <td>B</td>
                        <td>2024-06-07 16:46:06.637</td>
                        <td>2024-07-08 00:10:41.113</td>
                    </tr>
                    <tr>
                        <td>F4189855508853844620002</td>
                        <td>802106</td>
                        <td>19907</td>
                        <td>54773</td>
                        <td>R135_5</td>
                        <td>1084481446</td>
                        <td>801581-2003F</td>
                        <td>7706T028</td>
                        <td>2003377</td>
                        <td>33</td>
                        <td>2</td>
                        <td>B</td>
                        <td>2024-06-07 16:46:06.637</td>
                        <td>2024-07-08 00:10:41.113</td>
                    </tr>
                    <tr>
                        <td>F4189855508853844620002</td>
                        <td>802106</td>
                        <td>19907</td>
                        <td>54773</td>
                        <td>R135_5</td>
                        <td>1084481446</td>
                        <td>801581-2003F</td>
                        <td>7706T028</td>
                        <td>2003377</td>
                        <td>33</td>
                        <td>2</td>
                        <td>B</td>
                        <td>2024-06-07 16:46:06.637</td>
                        <td>2024-07-08 00:10:41.113</td>
                    </tr>
                </tbody>
            </table>
            <div className="">
                <Button
                    className=""
                    variant="primary"
                    title="Exportar Datos"
                    id="input"
                   // onClick={exportToExcel}
                >
                    Descargar Componentes <FaIcons.FaDownload />
                </Button>
            </div>
        </div>
    )
};
export default ComponentsTable;