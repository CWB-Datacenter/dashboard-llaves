import { Grid } from "@mui/material"
import { Navbar } from "./components/Navbar"
import { MainContent } from "./components/Llaves/MainContent"
import { Sidebar } from "./components/Archivos/Sidebar"
import './App.css'


function App() {

  return (
    <div className="app">
      <Navbar />
      <div className="app-content">
        <Grid container spacing={2} className="grid-container">
          <Grid item xs={9}> 
            <MainContent />
          </Grid>
          <Grid item xs={3}>
            <Sidebar />
          </Grid>
        </Grid>
      </div>
    </div>
  )
}

export default App