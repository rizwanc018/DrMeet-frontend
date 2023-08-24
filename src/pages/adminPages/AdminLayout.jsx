import { Outlet } from 'react-router-dom'
import { SideBar, Header } from "../../_components/adminComponents"

function AdminLayout() {
    return (
        <div className='h-full'>
            <Header />
            <div className='flex mt-20'>
                <SideBar />
                <div className='w-full overflow-x-scroll'>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default AdminLayout