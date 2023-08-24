import { Routes, Route } from 'react-router-dom'
import { UserPrivateRoutes } from '../utils'
import ErrorPage from '../pages/ErrorPage';
import {
    DoctorsPage,
    HomePage,
    UserLayout,
    UserLoginPage,
    UserRgisterPage,
    MakeAppointment,
    AppointmentSuccess,
    MeetDoctorPage,
    AppointmentsPage,
    DietitianPage
} from '../pages/userPages';

const UserRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<UserLayout />}>
                <Route path="" element={<HomePage />} />
                <Route path="login" element={<UserLoginPage />} />
                <Route path="register" element={<UserRgisterPage />} />
                <Route path="doctors" element={<DoctorsPage />} />
                <Route path="appointment-success" element={<AppointmentSuccess />} />
                <Route element={<UserPrivateRoutes />}>
                    <Route path="meet/:docSokId" element={<MeetDoctorPage />} />
                    <Route path="dietitian" element={<DietitianPage />} />
                    <Route path="appointment/apply/:id" element={<MakeAppointment />} />
                    <Route path="appointments" element={<AppointmentsPage />} />
                </Route>
                <Route path='*' element={<ErrorPage />} />
            </Route>
        </Routes>
    )
}

export default UserRoutes