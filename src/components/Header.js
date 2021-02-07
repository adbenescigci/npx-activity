import {useContext} from 'react';
import NoteContext from '../context/notes-context';
import {history} from '../routers/AppRouter';
import {startLogOut} from '../actions/auth';

const Header = () => { 
    
    const {state, dispatch} = useContext (NoteContext);
    const uid = state.filters.uid;

    const logOut = () => { startLogOut().then(()=>{
        dispatch({type: 'SET_ID', uid:''})
    })}
         
    return <div>
            { uid !== '' ? 
                <div>
                    <button onClick={logOut}>LogOut </button> 
                    {history.location.pathname === `/myPage/${uid}`? 
                        <button onClick={()=>history.push('/')}> Ana Sayfa</button> :
                        <button onClick={()=>history.push(`/myPage/${uid}`)}> Go to MyPage </button> 
                    }
                </div>: 
                <button onClick={()=>history.push('/loginPage')}> Login </button>
            }
        </div>
    }

export { Header as default }
