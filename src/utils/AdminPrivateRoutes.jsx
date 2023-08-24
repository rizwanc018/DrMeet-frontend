import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const AdminPrivateRoutes = () => {
    const { userInfo } = useSelector(state => state.auth)
    return (
        userInfo && userInfo.isAdmin ? <Outlet /> : <Navigate to='/login' />
    )
}

export default AdminPrivateRoutes