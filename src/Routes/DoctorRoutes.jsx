import { Routes, Route } from 'react-router-dom'
import { DoctorPirvateRoutes } from '../utils'
import ErrorPage from '../pages/ErrorPage';
import {
    DoctorHome,
    DoctorLogin,
    DoctorRegister,
    DoctorLayout,
    Appointments,
    ConsultationPage,
    DashBoard
} from '../pages/doctorPages';

const DoctorRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<DoctorLayout />}>
                <Route path="login" element={<DoctorLogin />} />
                <Route path="register" element={<DoctorRegister />} />
                <Route element={<DoctorPirvateRoutes />}>
                    <Route path="" element={<DashBoard />} />
                    <Route path="schedules" element={<DoctorHome />} />
                    <Route path="appointments" element={<Appointments />} />
                    <Route path="consoltation/:patientId" element={<ConsultationPage />} />
                </Route>
                <Route path='*' element={<ErrorPage />} />
            </Route>
        </Routes>
    )
}

export default DoctorRoutes