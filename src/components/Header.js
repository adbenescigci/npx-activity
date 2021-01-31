import {useContext} from 'react';
import NoteContext from '../context/notes-context';
import {history} from '../routers/AppRouter';

const Header = () => { 
    
    const {state, dispatch} = useContext (NoteContext);

    const id = state.filters.id;

        return <div>

            { id !== '' ? 
                <div>
                    <button onClick={()=>{dispatch({type: 'SET_ID',id:''})}}>LogOut</button> 
                    <button onClick={()=>history.push('/myPage')}> Go to MyPage </button>
                </div>: 
                <button onClick={()=>history.push('/loginPage')}>Login</button>
            }
        
        </div>
    }

export { Header as default }
