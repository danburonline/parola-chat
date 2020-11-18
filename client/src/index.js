import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import FingerprintJS from '@fingerprintjs/fingerprintjs';

// TODO Get FingerprintJS Pro for the final version of Parola
(async () => {
  // Create fingerprinting hash
  const fp = await FingerprintJS.load();
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
