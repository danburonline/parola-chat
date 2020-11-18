import React, { Fragment } from 'react';
import Welcome from '../layouts/Welcome/Welcome';
import Conversation from '../layouts/Conversation/Conversation';
import { Route, Switch, Redirect } from 'react-router-dom';

function App(props) {
  return (
    <Fragment>
      <Switch>
        <Route exact path='/chat' render={() => <Conversation uuid={props.uuid} />} />
        <Route exact path='/welcome' component={Welcome} />
        <Redirect from='/' to='/welcome' />
      </Switch>
    </Fragment>
  );
}

export default App;
