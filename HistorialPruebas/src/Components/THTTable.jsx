import {React, useState} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/TableComponents.css'
import { Button } from "react-bootstrap";

import * as FaIcons from "react-icons/fa";
const THTTable = () => {

    
    return (
        <div className="table-responsive CTitulos ">
            <table className='table table-hover table-sm table-striped scroll'>
                <thead className="table-dark CTitulos">
                    <tr key={0}>
                        <th>Serial Number</th>
                        <th>MID</th>
                        <th>Lot Vendor</th>
                        <th>Part Number</th>
                        <th>Line</th>
                        <th>Date Time</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>F3356322701827434110040</th>
                        <th>20812094</th>
                        <th>12/20/2023</th>
                        <th>800533-0010</th>
                        <th>THT ASE 5</th>
                        <th>2024-01-02 07:58:09.000</th>
                    </tr>
                    <tr>
                        <th>F3356322701827434110040</th>
                        <th>20811864</th>
                        <th>N230063</th>
                        <th>800529-0010</th>
                        <th>THT ASE 5</th>
                        <th>2024-01-02 07:58:09.000</th>
                    </tr>
                </tbody>
            </table>


        </div>
    )
};
export default THTTable;