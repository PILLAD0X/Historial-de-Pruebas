import {React} from "react";
import 'bootstrap/dist/css/bootstrap.css';
 
import '../styles/Home.css'
import * as FaIcons from 'react-icons/fa';
const ParentChild = (props)=> {
    return(
        <div className='divpropiedades'>
        { props.datos === 'No se encontro una relacion entre Parent y Child' ?
         <h3><FaIcons.FaExclamationTriangle/> No se encontro relacion Parent - Child en Genie</h3>       
        :

        <p className='lbspropiedades propiedadesT'><FaIcons.FaDatabase/> Genie</p>
        }
        { props.datos === 'No se encontro una relacion entre Parent y Child'  ?
            <h6> </h6>
        :
            <p className='lbspropiedades propiedadesT'>Parent:</p>
        }
        { props.datos === 'No se encontro una relacion entre Parent y Child'  ?
            <h6> </h6>
        :
        <p className='lbspropiedadesnum'>{props.datos.parent}</p>
        }
        { props.datos === 'No se encontro una relacion entre Parent y Child'  ?
            <h6> </h6>
        :
            <p className='lbspropiedades propiedadesT'>Child: </p>
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