import {history} from '../routers/AppRouter';
import {startLogin} from '../actions/auth';

const LoginPage = ()=>{
  
  return <div> 
            <button onClick={startLogin}> Login with Google  </button>
            <button onClick={()=> history.push('/')}> Go to MainPage</button>
          </div>
}

export {LoginPage as default}