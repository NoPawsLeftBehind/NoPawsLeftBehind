import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Auth0Provider } from '@auth0/auth0-react'

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const rootElement = document.getElementById('root');

ReactDOM.render(
    <BrowserRouter basename={baseUrl}>
        <Auth0Provider
            domain="dev-jj9cgfsz.us.auth0.com"
            clientId="HMECjujf8tkjYkUEb2QNEKnNEDYQi6xt"
            redirectUri={window.location.origin}>
            <App />
        </Auth0Provider>
    </BrowserRouter>,
    rootElement);

registerServiceWorker();

