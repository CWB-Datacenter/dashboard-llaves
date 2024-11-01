import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import DatacenterProvider from './context/DatacenterContext.jsx'
import KeysProvider from './context/llaves/KeysContext.jsx'
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DatacenterProvider>
      <KeysProvider>
        <App />
      </KeysProvider>
    </DatacenterProvider>
  </StrictMode>
)
