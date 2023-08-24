import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const DoctorPirvateRoutes = () => {

  const { userInfo } = useSelector(state => state.auth)

  return (

    userInfo && userInfo.isDoctor ? <Outlet /> : <Navigate to='/doctor/login' />

  )
}

export default DoctorPirvateRoutes