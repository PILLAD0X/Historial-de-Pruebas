import {React} from "react"; 
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/TablePruebas.css';
const TablePruebas = (props)=> {
    return(

        <div className="table-responsive centrar CTitulos">

            {props.tableType === 'PCB' & props.infoTestTable !== 0 & props.infoTestTable !== undefined ? 
            (

                <h2 className="espaciadoVertical"> Pruebas PCB </h2>

            ) : props.tableType === 'FinalAssembly' & props.infoTestTable !== 0 & props.infoTestTable !== undefined ?(


                <h2 className="espaciadoVertical">Pruebas Final Assembly</h2>
            
            
            
            ): props.tableType === 'Others' & props.infoTestTable !== 0 & props.infoTestTable !== undefined ?(
                <h2 className="espaciadoVertical">Historial de Pruebas</h2>
            ):(
                <h6></h6>
            )}

            {/**TABLAS */}


            {props.tableType === 'PCB' & props.infoTestTable !== 0 & props.infoTestTable !== undefined ? 
            (

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
                        <th>Box</th>
                        <th>Pallet</th>
                    </tr>
                </thead>
                <tbody>
                    
                {props.infoTestTable.map((TEST) => {
                    const teststatus = TEST.testResult;
                    if(teststatus === 'F'){
                        return (
                            <tr className="table-danger" key={TEST.testDateTime}>
                                <td>{TEST.line}</td>
                                <td>{TEST.barcodeSerialNumber}</td>
                                <td>{TEST.testResult}</td>
                                <td>{TEST.testDateTime}</td>
                                <td>{TEST.partID}</td>
                                <td>{TEST.certifiedTestNumber}</td>
                                <td>{TEST.testterID}</td>
                                <td>{TEST.employeeNumber}</td>
                                <td>{TEST.box}</td>
                                <td>{TEST.pallet}</td>
                            </tr>
                        );

                    }else{
                        return (
                            <tr key={TEST.testDateTime}>
                                <td>{TEST.line}</td>
                                <td>{TEST.barcodeSerialNumber}</td>
                                <td>{TEST.testResult}</td>
                                <td>{TEST.testDateTime}</td>
                                <td>{TEST.partID}</td>
                                <td>{TEST.certifiedTestNumber}</td>
                                <td>{TEST.testterID}</td>
                                <td>{TEST.employeeNumber}</td>
                                <td>{TEST.box}</td>
                                <td>{TEST.pallet}</td>
                            </tr>
                        );
                    }
                    
                })}
                </tbody>
            </table>

            ) : props.tableType === 'FinalAssembly' & props.infoTestTable !== 0 & props.infoTestTable !== undefined ?( 
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
                        <th>Box</th>
                        <th>Pallet</th>
                    </tr>
                </thead>
                <tbody>
                    
                {props.infoTestTable.map((TEST) => {
                    const teststatus = TEST.testResult;
                    if(teststatus === 'F'){
                        return (
                            <tr className="table-danger" key={TEST.testDateTime}>
                                <td>{TEST.line}</td>
                                <td>{TEST.barcodeSerialNumber}</td>
                                <td>{TEST.testResult}</td>
                                <td>{TEST.testDateTime}</td>
                                <td>{TEST.partID}</td>
                                <td>{TEST.certifiedTestNumber}</td>
                                <td>{TEST.testterID}</td>
                                <td>{TEST.employeeNumber}</td>
                                <td>{TEST.box}</td>
                                <td>{TEST.pallet}</td>
                            </tr>
                        );

                    }else{
                        return (
                            <tr key={TEST.testDateTime}>
                                <td>{TEST.line}</td>
                                <td>{TEST.barcodeSerialNumber}</td>
                                <td>{TEST.testResult}</td>
                                <td>{TEST.testDateTime}</td>
                                <td>{TEST.partID}</td>
                                <td>{TEST.certifiedTestNumber}</td>
                                <td>{TEST.testterID}</td>
                                <td>{TEST.employeeNumber}</td>
                                <td>{TEST.box}</td>
                                <td>{TEST.pallet}</td>
                            </tr>
                        );
                    }
                    
                })}
                </tbody>
                </table>
            
            
            
            ): props.tableType === 'Others' & props.infoTestTable !== 0 & props.infoTestTable !== undefined ?(
                
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
                        <th>Box</th>
                        <th>Pallet</th>
                    </tr>
                </thead>
                <tbody>
                    
                {props.infoTestTable.map((TEST) => {
                    const teststatus = TEST.testResult;
                    if(teststatus === 'F'){
                        return (
                            <tr className="table-danger" key={TEST.testDateTime}>
                                <td>{TEST.line}</td>
                                <td>{TEST.barcodeSerialNumber}</td>
                                <td>{TEST.testResult}</td>
                                <td>{TEST.testDateTime}</td>
                                <td>{TEST.partID}</td>
                                <td>{TEST.certifiedTestNumber}</td>
                                <td>{TEST.testterID}</td>
                                <td>{TEST.employeeNumber}</td>
                                <td>{TEST.box}</td>
                                <td>{TEST.pallet}</td>
                            </tr>
                        );

                    }else{
                        return (
                            <tr key={TEST.testDateTime}>
                                <td>{TEST.line}</td>
                                <td>{TEST.barcodeSerialNumber}</td>
                                <td>{TEST.testResult}</td>
                                <td>{TEST.testDateTime}</td>
                                <td>{TEST.partID}</td>
                                <td>{TEST.certifiedTestNumber}</td>
                                <td>{TEST.testterID}</td>
                                <td>{TEST.employeeNumber}</td>
                                <td>{TEST.box}</td>
                                <td>{TEST.pallet}</td>
                            </tr>
                        );
                    }
                    
                })}
                </tbody>
                </table>
                
            ):(

                <h2 className="espaciadoVertical"></h2>
            )}




            
        </div>
    );
};
export default TablePruebas;