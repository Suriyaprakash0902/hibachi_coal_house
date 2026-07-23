import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import { AlertProvider } from './components/AlertContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename="/HCH">
      <AlertProvider>
        <App />
      </AlertProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
