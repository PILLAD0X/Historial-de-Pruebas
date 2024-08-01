import {React, useState} from "react";
import 'bootstrap/dist/css/bootstrap.css';

import ModalPCBDetail from '../Components/ModalPCBDetail';
import '../styles/ParentChild.css';
import * as FaIcons from 'react-icons/fa';
import * as FiIcons from "react-icons/hi";
import * as FmIcons from "react-icons/md";
const ParentChild = (props)=> {
    const [showModal, setShowModal] = useState(false);
    const [triggeredBy, setTriggeredBy] = useState('');
    const [pcb, setPcb] = useState('');
    const [technology, setTechnology]= useState ('')
    const [mfgLine, setMfgLine]= useState ('')

    const handleLinkClick = (event, btnclicked, PCB) => {
        event.preventDefault();
        setTriggeredBy(btnclicked);
        setPcb(PCB);
        setShowModal(true);
        PCBTechnology(PCB);
    };


    const PCBTechnology = (PCB)=>{ //se utilizara para identificar si la placa fue hecha en Siplace o en panasonic y asi poder renderizar la tabla correcta y traer las pruebas.
        //console.log
        const line = PCB.substring(17,19)
        setMfgLine(line)
//        console.log(mfgLine);
        if (line == 5){
            setTechnology('Siplace')            
        }else if (line == 7){
            setTechnology('Siplace')            
        }else if (line == 8){
            setTechnology('Siplace')            
        }else if (line == 9){
            setTechnology('Siplace')            
        }else if(line == 10 ){
            setTechnology('Siplace')
        }else if (line == 11){
            setTechnology('Siplace')          
        }else if (line == 12){
            setTechnology('Siplace')            
        }else if (line == 13){
            setTechnology('Siplace')            
        }else{
            setTechnology('Panasonic')
        }
 //       console.log(technology);
    }
    
    const handleCloseModal = () => {
    setShowModal(false);
    };

    if(props.datos !== 'No se encontro una relacion entre Parent y Child'){ 
        return(
            <div className='divProductProperties'>
                <p className='lbspropiedades propiedadesT'><FmIcons.MdCloseFullscreen/> AmpRelation:</p>
                <p className='lbspropiedades propiedadesT'>Amplifier:</p>
                <p className='lbspropiedadesnum'>{props.datos.parent}</p>
                <p className='lbspropiedades propiedadesT'>PCB: </p>
                <div className="">
                    <div className="">

                        <div className="display-container">
                            <p className='lbspropiedades propiedadesT containerPCBIcon'>TSS<FiIcons.HiArrowNarrowUp className="iconPCB"/></p>
                            <a className='lbspropiedadesnum PCBInf' title="Show Components" onClick={(e)=> handleLinkClick(e,'Top',props.datos.child)}>{props.datos.child}</a>
                        </div>
                        { props.datos.bsS_Barcode !== ''  ?

                            <div className="display-container">
                                <p className='lbspropiedades propiedadesT containerPCBIcon'>BSS<FiIcons.HiArrowSmDown className="iconPCB"/></p>
                                <a className='lbspropiedadesnum PCBInf' title="Show Components" onClick={(e)=> handleLinkClick(e,'Bottom', props.datos.bsS_Barcode)}>{props.datos.bsS_Barcode}</a>
                            </div>
                        :
                            <div className="display-container">
                                <p className='lbspropiedades propiedadesT containerPCBIcon'>BSS<FiIcons.HiArrowSmDown className="iconPCB"/></p>
                                <p className='lbspropiedades propiedadesT'><FaIcons.FaExclamationTriangle className="iconPCB"/> No Bottom Record.</p>
                            </div>
                        }

                    </div>
                </div>
                 
                <ModalPCBDetail show={showModal} handleClose={handleCloseModal} triggeredBy = {triggeredBy} technology = {technology} pcb = {pcb} mfgLine = {mfgLine} />
            </div>
        );
    }else { //When we don't have a Top and botton relation for the PCB
        return(
            <div className='divProductProperties'>
                { props.datos === 'No se encontro una relacion entre Parent y Child' ? 
                <h3><FaIcons.FaExclamationTriangle/>Could not find relationship between PCB and Amplifier</h3>       
                :
                <p className='lbspropiedades propiedadesT'><FaIcons.FaDatabase/> AmpRelation:</p>
                }
                { props.datos === 'No se encontro una relacion entre Parent y Child'  ?
                    <h6> </h6>
                :
                    <p className='lbspropiedades propiedadesT'>Amplifier:</p>
                }
                { props.datos === 'No se encontro una relacion entre Parent y Child'  ?
                    <h6> </h6>
                :
                    <a className='lbspropiedadesnum PCBInf' title="Ver componentes" onClick={(e)=> handleLinkClick(e,'Top',props.datos.child)}>{props.datos.child}</a>

                }
                { props.datos === 'No se encontro una relacion entre Parent y Child'  ?
                    <h6> </h6>
                :
                    <p className='lbspropiedades propiedadesT'>PCB: </p>
                }
            </div>
        );

    }

};
export default ParentChild;