
import Grid from "@mui/material/Grid2"
import { MainContent } from "../components/Llaves/MainContent"
import { Sidebar } from "../components/Archivos/Sidebar"

export const LlavesPage = () => (
    <Grid container sx={{
        height: "calc(100vh - 64px)",
        flexDirection: { xs: "column", md: "row" },
        flexWrap: { xs: "nowrap", md: "wrap" }
    }}>
        <Grid size={{ xs: 12, md: 8 }} sx={{ height: { xs: "auto", md: "90%", xl: "93%" } }}>
            <MainContent />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
            <Sidebar />
        </Grid>
    </Grid>
)
