import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { NotionDataProvider } from './contexts/NotionDataContext.jsx'

ReactDOM.createRoot(document.getElementById('charts')).render(
  <React.StrictMode>
    <NotionDataProvider>
      <App />
    </NotionDataProvider>
  </React.StrictMode>
)
