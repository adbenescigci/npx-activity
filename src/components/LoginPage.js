import {useContext,useEffect} from 'react';
import NotesContext from '../context/notes-context';
import {history} from '../routers/AppRouter';


const LoginPage = ()=>{

    const { state, dispatch } = useContext (NotesContext)
    
    useEffect(()=>{
        console.log(state.filters.id)
        if(state.filters.id.length> 5){
            console.log('test'); history.push('/')
        }
       },[state.filters.id])
    
    return <div>
            <button onClick={()=>{dispatch({type: 'SET_ID',id:'72ce521be14'})}}>Login</button>
            <button onClick={()=>{dispatch({type: 'SET_ID',id:''})}}>LogOut</button>
           </div>
}

export {LoginPage as default}