import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import FingerprintJS from '@fingerprintjs/fingerprintjs-pro';

(async () => {
  // ! Create a new FingerprintJS Pro token and load it into an env variable in the final app
  const fp = await FingerprintJS.load({
    token: '5bWcx4glQuPmrxdBrbh4',
    region: 'eu',
  });
  const result = await fp.get();
  const visitorId = result.visitorId;

  await ReactDOM.render(
    <React.StrictMode>
      <BrowserRouter>
        <App uuid={visitorId} />
      </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
  );

  serviceWorker.unregister();
})();
