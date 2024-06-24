import {React} from "react";
import 'bootstrap/dist/css/bootstrap.css';
 
import '../styles/Home.css'
import * as FaIcons from 'react-icons/fa';
const ParentChild = (props)=> {
    return(
        <div className='divpropiedades'>
        { props.datos === 'No se encontro una relacion entre Parent y Child' ? 
         <h3><FaIcons.FaExclamationTriangle/> Could not get an amplifier relationship</h3>       
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
        <p className='lbspropiedadesnum'>{props.datos.parent}</p>
        }
        { props.datos === 'No se encontro una relacion entre Parent y Child'  ?
            <h6> </h6>
        :
            <p className='lbspropiedades propiedadesT'>PCB: </p>
        }
         { props.datos === 'No se encontro una relacion entre Parent y Child'  ?
            <h6> </h6>
        :
            <p className='lbspropiedadesnum'>{props.datos.child}</p>
        }  
        </div>
    );
};
export default ParentChild;