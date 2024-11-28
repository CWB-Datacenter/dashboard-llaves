import { Navbar } from '../components/Navbar'
import { Navigate, Route, Routes } from 'react-router-dom'
import { LlavesPage } from '../Pages/LlavesPage'
import { QRCargaPage } from '../Pages/QRCargaPage'
import { Box } from '@mui/material'

export const AppRouter = () => {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/llaves" element={<LlavesPage />} />
                <Route path="/qrcarga" element={<QRCargaPage />} />
                <Route path="/" element={<Navigate to="/llaves" />} /> {/* Redirección inicial */}
            </Routes>
        </>
    )
}
