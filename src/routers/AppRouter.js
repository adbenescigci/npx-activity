import { useContext } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import MainPage from '../components/MainPage';
import LoginPage from '../components/LoginPage';
import MyNotes from '../components/MyNotes';
import NoteContext from '../context/notes-context';

export const history = createBrowserHistory();

const Reject= ()=>{
  return <Redirect to='/'/>
}

const AppRouter = () => {
  
  const {state} = useContext(NoteContext);
  const id = state.filters.id;

  return (
    <Router history= {history}>
      <div>
        <Switch>
          <Route path="/" component={MainPage} exact={true}/>
          <Route path="/loginPage" component={LoginPage} />
          <Route path="/myPage" component={id !=='' ? MyNotes: Reject }/>
      </Switch>
      </div>     
    </Router>
)}

export {AppRouter as default};

// history= {history}