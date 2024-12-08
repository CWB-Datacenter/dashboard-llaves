import { Navbar } from '../components/Navbar'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { LlavesPage } from '../Pages/LlavesPage'
import { QRCargaPage } from '../Pages/QRCargaPage'

export const AppRouter = () => {
    const location = useLocation()

    useEffect(() => {
        switch (location.pathname) {
            case '/llaves':
                document.title = 'Gestión de Llaves'
                break
            case '/qrcarga':
                document.title = 'QR Carga'
                break
            default:
                document.title = 'Gestión de llaves' // Título por defecto
                break
        }
    }, [location])

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
