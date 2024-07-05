import {React} from "react";
import 'bootstrap/dist/css/bootstrap.css';
//import '../styles/Home.css'
import '../styles/ParentChild.css'
import * as FaIcons from 'react-icons/fa';
import * as FiIcons from "react-icons/hi"
import * as FmIcons from "react-icons/md"

const ParentChild = (props)=> {
    console.log(props.datos);
    if(props.datos.length > 1){ 
        return(
            <div className='divProductProperties'>
            { props.datos === 'No se encontro una relacion entre Parent y Child' ? 
             <h3><FaIcons.FaExclamationTriangle/>No se encontro una relacion PCB - amplificador para la serie buscada</h3>       
            :
            <p className='lbspropiedades propiedadesT'><FmIcons.MdCloseFullscreen/> AmpRelation:</p>
            }
            { props.datos === 'No se encontro una relacion entre Parent y Child'  ?
                <h6> </h6>
            :
                <p className='lbspropiedades propiedadesT'>Amplifier:</p>
            }
            { props.datos === 'No se encontro una relacion entre Parent y Child'  ?
                <h6> </h6>
            :
            <p className='lbspropiedadesnum'>{props.datos[1].parent}</p>
            }
            { props.datos === 'No se encontro una relacion entre Parent y Child'  ?
                <h6> </h6>
            :
                <p className='lbspropiedades propiedadesT'>PCB: </p>
            }
             { props.datos === 'No se encontro una relacion entre Parent y Child'  ?
                <h6> </h6>
            :
                <div className="">
                    <div className="">
                        <div className="display-container">
                            <p className='lbspropiedades propiedadesT'> <FiIcons.HiArrowNarrowUp className="iconPCB"/></p>
                            <a className='lbspropiedadesnum PCBInf' title="Ver componentes">{props.datos[1].child}</a>
                        </div>
                        <div className="display-container">
                            <p className='lbspropiedades propiedadesT'><FiIcons.HiArrowSmDown className="iconPCB"/></p>
                            <a className='lbspropiedadesnum PCBInf' title="Ver componentes">{props.datos[0].bsS_Barcode}</a>
                        </div>
                    </div>
                </div>
            }  
            </div>
        );
    }else{ //When we don't have a Top and botton relation for the PCB
        return(
            <div className='divProductProperties'>
            { props.datos === 'No se encontro una relacion entre Parent y Child' ? 
             <h3><FaIcons.FaExclamationTriangle/>No se encontro una relacion PCB - amplificador para la serie buscada</h3>       
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
            <p className='lbspropiedadesnum'>{props.datos[0].parent}</p>
            }
            { props.datos === 'No se encontro una relacion entre Parent y Child'  ?
                <h6> </h6>
            :
                <p className='lbspropiedades propiedadesT'>PCB: </p>
            }
             { props.datos === 'No se encontro una relacion entre Parent y Child'  ?
                <h6> </h6>
            :
                <div className="">
                    <div className="">
                        <div className="display-container">
                            <p className='lbspropiedades propiedadesT'> <FiIcons.HiArrowNarrowUp className="iconPCB"/></p>
                            <a className='lbspropiedadesnum PCBInf' title="Ver componentes">{props.datos[0].child}</a>
                        </div>
                        <div className="display-container">
                            <p className='lbspropiedades propiedadesT'><FiIcons.HiArrowSmDown className="iconPCB"/></p>
                            <p className='lbspropiedades propiedadesT'><FaIcons.FaExclamationTriangle/> Sin Registro de Bottom </p>
                           
                        </div>
                    </div>
                </div>
            }  
            </div>
        );

    }

};
export default ParentChild;