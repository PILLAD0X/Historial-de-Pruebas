import {React} from "react"; 
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/TablePruebasPCB.css';
//import { Table } from "react-bootstrap";
const TablePruebasPCB = (props)=> {
    return(
        <div className="table-responsive centrar CTitulos">
            <table className='table table-hover table-sm table-striped'>
                <thead className="table-dark CTitulos">
                    <tr key={0}>
                        <th>Line</th>
                        <th>Serial Number</th>
                        <th>Test Result</th>
                        <th>Test Date Time</th>                 
                        <th>Part ID</th>
                        <th>Test Number</th>
                        <th>Tester</th>
                        <th>Employee Number</th>
                        <th>Record Number</th>
                        <th>Box</th>
                        <th>Pallet</th>
                    </tr>
                </thead>
                <tbody>
                    
                {props.infoPCBTable.map((PCB) => {
                    const teststatus = PCB.testResult;
                    if(teststatus === 'F'){
                        return (
                            <tr className="table-danger" key={PCB.testDateTime}>
                                <td>{PCB.productionLine}</td>
                                <td>{PCB.barcodeSerialNumber}</td>
                                <td>{PCB.testResult}</td>
                                <td>{PCB.testDateTime}</td>
                                <td>{PCB.partID}</td>
                                <td>{PCB.certifiedTestNumber}</td>
                                <td>{PCB.testterID}</td>
                                <td>{PCB.employeeNumber}</td>
                                <td>{PCB.recordNumber}</td>
                                <td>{PCB.box}</td>
                                <td>{PCB.pallet}</td>
                            </tr>
                        );

                    }else{
                        return (
                            <tr key={PCB.testDateTime}>
                                <td>{PCB.productionLine}</td>
                                <td>{PCB.barcodeSerialNumber}</td>
                                <td>{PCB.testResult}</td>
                                <td>{PCB.testDateTime}</td>
                                <td>{PCB.partID}</td>
                                <td>{PCB.certifiedTestNumber}</td>
                                <td>{PCB.testterID}</td>
                                <td>{PCB.employeeNumber}</td>
                                <td>{PCB.recordNumber}</td>
                                <td>{PCB.box}</td>
                                <td>{PCB.pallet}</td>
                            </tr>
                        );
                    }
                    
                })}
                </tbody>
            </table>
            
        </div>
    );
};
export default TablePruebasPCB;