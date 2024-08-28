import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

//import * as serviceWorkerRegistration from './serviceWorkerRegistration';

import * as serviceWorker from './serviceWorker';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// Register the service worker
//serviceWorkerRegistration.register();

serviceWorker.register();