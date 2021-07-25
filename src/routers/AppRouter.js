import { useContext } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import MainPage from '../components/MainPage';
import LoginPage from '../components/LoginPage';
import MyNotes from '../components/MyNotes';
import NoteContext from '../context/notes-context';

export const history = createBrowserHistory();

const AppRouter = () => {
  const { state } = useContext(NoteContext);
  const id = state.filters.uid;

  return (
    <Router history={history}>
      <div>
        <Switch>
          <Route path="/" component={MainPage} exact={true} />
          <Route path="/loginPage" component={LoginPage} exact={true} />
          {id !== '' ? <Route path={`/myPage/${id}`} component={MyNotes} /> : history.push('/')}
        </Switch>
      </div>
    </Router>
  );
};

export { AppRouter as default };
