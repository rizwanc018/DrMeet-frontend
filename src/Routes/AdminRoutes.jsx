import { Routes, Route } from 'react-router-dom'
import { AdminPrivateRoutes } from '../utils'
import ErrorPage from '../pages/ErrorPage'
import {
    AdminHome,
    AdminLogin,
    Departments,
    AdminLayout,
    RegisteredDoctors,
    ApprovedDoctors,
    Patients
} from '../pages/adminPages'


const AdminRoutes = () => {
    return (
        <Routes>
            <Route path="/login" element={<AdminLogin />} />
            <Route path="/" element={<AdminLayout />}>
                <Route element={<AdminPrivateRoutes />}>
                    <Route path="" element={<AdminHome />} />
                    <Route path="departments" element={<Departments />} />
                    <Route path="doctors" element={<ApprovedDoctors />} />
                    <Route path="doctor-requests" element={<RegisteredDoctors />} />
                    <Route path="patients" element={<Patients />} />
                </Route>
            </Route>
                <Route path='*' element={<ErrorPage />} />
        </Routes>
    )
}

export default AdminRoutes