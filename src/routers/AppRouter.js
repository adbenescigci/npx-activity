import { useContext } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import DashBoard from '../components/DashBoard';
import LoginPage from '../components/LoginPage';
import MyNotes from '../components/MyPage/MyNotes';
import ActivityContext from '../context/notes-context';

export const history = createBrowserHistory();

const AppRouter = () => {
  const { state } = useContext(ActivityContext);
  const id = state.filters.uid;

  return (
    <Router history={history}>
      <div>
        <Switch>
          <Route path="/" component={DashBoard} exact={true} />
          <Route path="/loginPage" component={LoginPage} exact={true} />
          <Route path={`/myPage/${id}`} component={MyNotes} />
        </Switch>
      </div>
    </Router>
  );
};

export { AppRouter as default };
