import {useContext,useEffect,useState} from 'react';
import { Route ,Redirect} from 'react-router-dom';
import NoteContext from '../context/notes-context';

const PrivateRoute = ({  
    component : Component,
    ...rest
}) => {
    const {state} = useContext(NoteContext);
   const[id,setId]=useState('')
    useEffect(()=>{
        console.log(state.filters.id)
        setId(state.filters.id)
    },[state.filters.id])
    return (
    <Route {...rest} component = {(props) => 
        id !=='' ?
            <div>
                <Component {...props} />
            </div> :
            (
                <Redirect to='/'/>
            )
        }/>

)}


export {PrivateRoute as default};