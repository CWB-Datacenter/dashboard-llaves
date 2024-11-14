import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

import { Navbar } from "./components/Navbar"
import { MainContent } from "./components/Llaves/MainContent"
import { Sidebar } from "./components/Archivos/Sidebar"
import Grid from '@mui/material/Grid2'
import './App.css'


function App() {

  return (
    <Grid container spacing={2}>
      <Navbar />
      <Grid size={{xs: 12, md: 8}} >
        <MainContent />
      </Grid>
      <Grid size={{xs: 12, md: 4}} >
        <Sidebar />
      </Grid>
    </Grid>
  )
}

export default App