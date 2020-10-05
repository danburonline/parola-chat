import React, {Fragment} from 'react';
import Welcome from '../layouts/Welcome/Welcome';
import Conversation from '../layouts/Conversation/Conversation';
import { Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Fragment>
      <Switch>
        <Route exact path='/chat' component={Conversation} />
        <Route path='/' component={Welcome} />
      </Switch>
    </Fragment>
  );
}

export default App;
