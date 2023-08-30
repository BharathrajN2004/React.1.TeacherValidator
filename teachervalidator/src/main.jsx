import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from "@material-tailwind/react";

import { AuthContextProvider } from './Providers/AuthProvider.jsx';
import ErrorBoundary from './Providers/ErrorBoundary.jsx';
import App from './App.jsx'
import './index.css'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <ErrorBoundary>
          <AuthContextProvider>
            <App />
          </AuthContextProvider>
        </ErrorBoundary>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
)
