import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom';
import { Amplify } from 'aws-amplify';
import config from "./config"

Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: process.env.REGION,
    userPoolId: process.env.COGNITO_USER_POOL_ID,
    identityPoolId: process.env.COGNITO_IDENTITY_POOL_ID,
    userPoolWebClientId: process.env.COGNITO_APP_CLIENT_ID
  },
  Storage: {
    region: process.env.REGION,
    bucket: process.env.S3_BUCKET,
    identityPoolId: process.env.COGNITO_IDENTITY_POOL_ID
  },
  API: {
    endpoints: [
    {
      name: "notes",
      endpoint: process.env.API_GATEWAY_URL,
      region: process.env.REGION
    },
    ]
    }
});

ReactDOM.render(
  <Router>
  <App />
  </Router>,
  document.getElementById('root')
  );
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
