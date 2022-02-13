import { Suspense, lazy, useContext, memo } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import LoginPage from '../components/LoginPage';
import { StateContext } from '../context/notes-context';

const Dashboard = lazy(() => import('../components/DashBoard'));
const MyNotes = lazy(() => import('../components/MyPage/MyNotes'));

export const history = createBrowserHistory();
const AppRouter = () => {
  const { state_filters } = useContext(StateContext);
  const id = state_filters.uid;

  return (
    <Router history={history}>
      <div className="appRouter">
        <Suspense fallback={<div> Loading...</div>}>
          <Switch>
            <Route path="/" render={() => <Dashboard id={id} />} exact={true} />
            <Route path="/loginPage" component={LoginPage} exact={true} />
            <Route path={`/myPage/${id}`} component={MyNotes} />
          </Switch>
        </Suspense>
      </div>
    </Router>
  );
};

export default memo(AppRouter);
