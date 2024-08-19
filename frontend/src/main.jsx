import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { AuthProvider } from './contexts/AuthContext.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { CustomProvider } from 'rsuite';
import 'rsuite/dist/rsuite.min.css'; //rsuite/styles/index.less
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_APP_CLIENT_ID}>
      <CustomProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </CustomProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>,
)
