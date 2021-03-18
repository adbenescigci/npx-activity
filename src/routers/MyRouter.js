import {useEffect} from 'react';
import { Route, Switch, Link, useRouteMatch, Redirect, useLocation} from 'react-router-dom';
import MyActivities from '../components/MyActivities';
import MySelections from '../components/MySelections';
import MyArchive from '../components/MyArchive';
import AddNoteForm from '../components/AddNoteForm';

import {history} from './AppRouter';


const MyRouter = () => {
  let match = useRouteMatch();

  return ( <div>

        <Switch>
          <Route path={match.path}  exact={true}> <Redirect to={`${match.path}/MySelections`} /> </Route> 
          <Route path={`${match.path}/MyArchive`} component={MyArchive} exact={true}/>
          <Route path={`${match.path}/MyActivities`} component={MyActivities} exact={true}/>
          <Route path={`${match.path}/AddNoteForm`} component={AddNoteForm} exact={true}/>
          <Route path={`${match.path}/MySelections`} component={MySelections} exact={true}/>
          <Route path='*' component={NoMatch}/>
        </Switch>
      
        <ul>  
          <li> <Link to={`${match.url}/MySelections`}> Selections </Link></li>
          <li> <Link to={`${match.url}/MyActivities`}>Activities</Link></li>
          <li> <Link to={`${match.url}/MyArchive`}>Archive </Link></li>
          <li> <Link to={`${match.url}/AddNoteForm`}>Add Note </Link></li>
        </ul>

    </div>
)}

export {MyRouter as default};

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