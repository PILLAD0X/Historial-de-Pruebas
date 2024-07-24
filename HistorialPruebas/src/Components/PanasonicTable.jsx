import {React, useState} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/TableComponents.css'

const PanasonicTable = () => {
    return (
        <div className="table-responsive CTitulos ">
            <h1>Panasonic</h1>
            <table className='table table-hover table-sm table-striped scroll'>
                <thead className="table-dark CTitulos">
                    <tr key={0}>
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
                    <tr>
                        <td>F3211058801875299030010</td>
                        <td>977673856</td>
                        <td>268361-4751</td>
                        <td>0002003377</td>
                        <td>67218743</td>
                        <td>977673856</td>
                        <td>2023-07-11 04:03:09.000</td>
                    </tr>
                    <tr>
                        <td>F3211058801875299030010</td>
                        <td>977673856</td>
                        <td>268361-4751</td>
                        <td>0002003377</td>
                        <td>67218743</td>
                        <td>977673856</td>
                        <td>2023-07-11 04:03:09.000</td>
                    </tr>
                </tbody>
            </table>


        </div>
    )
};
export default PanasonicTable;