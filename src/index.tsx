import React from 'react';
import ReactDOM from 'react-dom';
import App from './Components/App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import { AuthProvider } from './Contexts/AuthContext';

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
			<App />
		</AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);