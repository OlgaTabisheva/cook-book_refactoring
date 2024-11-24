import React from 'react';
import {createRoot} from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';
import {BrowserRouter} from "react-router-dom";
import {NhostApolloProvider} from '@nhost/react-apollo'
import {NhostClient, NhostProvider} from '@nhost/react'

const container = document.getElementById('root');
const root = createRoot(container);


export const nhost = new NhostClient({
  subdomain: 'ywrtagnuxgrlisjemegx',
  region: 'eu-central-1'
})

root.render(
  <React.StrictMode>
    <NhostProvider nhost={nhost}>
      <NhostApolloProvider nhost={nhost}>
        <BrowserRouter>
          <App/>
        </BrowserRouter>
      </NhostApolloProvider>
    </NhostProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();