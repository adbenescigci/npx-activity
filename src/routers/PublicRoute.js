import {useContext} from 'react';
import { Route } from 'react-router-dom';

const PublicRoute = ({  
    component : Component,
    ...rest
}) => {

    return (
    <Route {...rest} component = {(props) => 
        <div>
            <Component {...props} />
        </div>}/>
)}


export {PublicRoute as default};

// (props)=>(
//     state.filters.id!=='' ? (
//         <div>
//             <Component {...props}/>
//             <h3>{state.filters.id}</h3>
//         </div>
//        ) : (
//             <Component {...props}/>
//        ) 
//     )