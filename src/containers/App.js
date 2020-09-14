import React, {Fragment} from 'react';
import Welcome from '../components/Welcome/Welcome';
import Chat from '../components/Chat/Chat';
import { Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Fragment>
      <Switch>
        <Route exact path='/chat' component={Chat} />
        <Route exact path='/' component={Welcome} />
      </Switch>
    </Fragment>
  );
}

export default App;
