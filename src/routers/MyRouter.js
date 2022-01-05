import { Route, Switch, NavLink, useRouteMatch, Redirect, useLocation } from 'react-router-dom';
import MyActivities from '../components/MyPage/MyActivities';
import MySelections from '../components/MyPage/MySelections';
import MyArchive from '../components/MyPage/MyArchive';
import AddNoteForm from '../components/MyPage/AddNoteForm';
import Manage from '../components/MyPage/Manage';

const MyRouter = () => {
  let match = useRouteMatch();

  const style = {
    fontWeight: 'bold',
    color: 'red',
  };

  return (
    <div className="myRouter">
      <ul>
        <li>
          <NavLink to={`${match.url}/MySelections`} activeStyle={style}>
            Selections
          </NavLink>
        </li>
        <li>
          <NavLink to={`${match.url}/MyActivities`} activeStyle={style}>
            Activities
          </NavLink>
        </li>
        <li>
          <NavLink to={`${match.url}/MyArchive`} activeStyle={style}>
            Archive
          </NavLink>
        </li>
        <li>
          <NavLink to={`${match.url}/AddActivityForm`} activeStyle={style}>
            Add Activity
          </NavLink>
        </li>
      </ul>

      <Switch>
        <Route path={match.path} exact={true}>
          <Redirect to={`${match.path}/MySelections`} />
        </Route>
        <Route path={`${match.path}/MyArchive`} component={MyArchive} exact={true} />
        <Route path={`${match.path}/AddActivityForm`} component={AddNoteForm} exact={true} />
        <Route path={`${match.path}/MySelections`} component={MySelections} exact={true} />
        <Route path={`${match.path}/MyActivities`} component={MyActivities} exact={true} />
        <Route path={`${match.path}/MyActivities/:id/Manage`} component={Manage} exact={true} />
        <Route path="*" component={NoMatch} />
        {<Redirect to={'/'} />}
      </Switch>
    </div>
  );
};

export { MyRouter as default };

function NoMatch() {
  let location = useLocation();

  return (
    <div>
      <h3>
        No match for <code>{location.pathname}</code>
      </h3>
    </div>
  );
}
