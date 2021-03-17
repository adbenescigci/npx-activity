import {useState, useEffect} from 'react';
import { Route, Switch, Link, useRouteMatch, useParams } from 'react-router-dom';
import MyActivities from '../components/MyActivities';
import MySelections from '../components/MySelections';
import MyArchive from '../components/MyArchive';
import AddNoteForm from '../components/AddNoteForm';

import {history} from './AppRouter';


const MyRouter = () => {
  let match = useRouteMatch();


  return ( <div>
      
    
        <Switch>
            
          <Route path={`${match.path}`} component={MySelections} exact={true} />
          <Route path={`${match.path}/MyActivities`} component={MyActivities} />
          <Route path={`${match.path}/MyArchive`} component={MyArchive} exact={true}/>
          <Route path={`${match.path}/AddNoteForm`} component={AddNoteForm} exact={true}/>
          <Route path={`${match.path}/MySelections`} component={MySelections} exact={true}/>
      </Switch>
      
      <ul>  
      <li> <Link to={`${match.url}`}> Selections </Link></li>
      <li> <Link to={`${match.url}/MyActivities`}>Activities</Link></li>
      <li> <Link to={`${match.url}/MyArchive`}>Archive </Link></li>
      <li> <Link to={`${match.url}/AddNoteForm`}>Add Note </Link></li>
  </ul>

    </div>
)}

export {MyRouter as default};