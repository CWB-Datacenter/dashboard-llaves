import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import DatacenterProvider from './context/DatacenterContext.jsx'
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DatacenterProvider>
      <App />
    </DatacenterProvider>
  </StrictMode>,
)
