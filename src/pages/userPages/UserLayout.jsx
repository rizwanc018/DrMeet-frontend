import { Header, Footer } from "../../_components/userComponents"
import { Outlet } from 'react-router-dom'


const UserLayout = () => {
    return (
        <div className="bg-white">
            <Header />
            <div className="mt-[4.2rem]"></div>
            <Outlet />
            <Footer />
        </div>
    )
}

export default UserLayout