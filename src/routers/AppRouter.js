import { Suspense, lazy, useContext } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
//import Dashboard from '../components/DashBoard';
import LoginPage from '../components/LoginPage';
//mport MyNotes from '../components/MyPage/MyNotes';
import ActivityContext from '../context/notes-context';

const Dashboard = lazy(() => import('../components/DashBoard'));
const MyNotes = lazy(() => import('../components/MyPage/MyNotes'));

export const history = createBrowserHistory();

const AppRouter = () => {
  const { state } = useContext(ActivityContext);
  const id = state.filters.uid;

  return (
    <Router history={history}>
      <div className="appRouter">
        <Suspense fallback={<div> Loading...</div>}>
          <Switch>
            <Route path="/" component={Dashboard} exact={true} />
            <Route path="/loginPage" component={LoginPage} exact={true} />
            <Route path={`/myPage/${id}`} component={MyNotes} />
          </Switch>
        </Suspense>
      </div>
    </Router>
  );
};

export { AppRouter as default };
