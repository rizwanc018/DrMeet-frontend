import React, { useState } from "react";
import { BsArrowLeftShort } from "react-icons/bs"
import { RiDashboardFill } from "react-icons/ri";
import { AiOutlineLogout, AiOutlineSchedule, AiOutlineDown } from "react-icons/ai";
import { FaUserDoctor, FaHospitalUser, FaUserInjured } from "react-icons/fa6";
import { Link, NavLink, useNavigate } from "react-router-dom"
import { useDispatch } from 'react-redux'
import { clearCredentials } from '../../slices/authSlice'
import axios from "axios";



function SideBar() {
    const [open, setOpen] = useState(true)
    const [submenuOpen, setSubmenuOpen] = useState(false)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const logoutHandler = async () => {
        const response = await axios.get('/api/admin/logout')
        if (response.data.success)
            dispatch(clearCredentials())
        navigate('/')
    }

    const Menus = [
        { title: 'Dashboard', icon: <RiDashboardFill />, link: '/admin' },
        {
            title: 'Doctors', icon: <FaUserDoctor />, link: '#', submenu: true,
            submenuItems: [
                { title: 'Doctors', link: '/admin/doctors' },
                { title: 'Requests', link: '/admin/doctor-requests' }
            ]
        },
        { title: 'Patients', icon: <FaUserInjured />, link: '/admin/patients' },
        { title: 'Departments', icon: <FaHospitalUser />, link: '/admin/departments' },
    ]


    return (
        <div className={`bg-primary h-screen p-5 pt-8 relative ${open ? 'w-60' : 'w-20'} duration-500`}>
            <BsArrowLeftShort
                className={`bg-white text-primary text-3xl rounded-full absolute -right-3 top-9 border border-primary-600 cursor-pointer duration-700 ${!open && 'rotate-180'}`}
                onClick={() => setOpen(!open)}
            />
            <ul>
                {Menus.map((menu, index) => (
                    <React.Fragment key={index} >
                        <li>
                            <NavLink to={menu.link}
                                className={`text-white flex items-center mb-2 p-2 gap-x-4 cursor-pointer rounded grid-cols-4 hover:bg-primary-600`}
                            >
                                <span className="text-2xl block float-left" >{menu.icon}</span>
                                <span className={`text-md font-medium ${!open && 'hidden'} `} >
                                    {menu.title}
                                </span>
                                {menu.submenu && open && (
                                    <AiOutlineDown className={`ms-auto ${submenuOpen && 'rotate-180'}`} onClick={() => setSubmenuOpen(!submenuOpen)} />
                                )}
                            </NavLink>
                        </li>
                        {menu.submenu && submenuOpen && open && (
                            <ul>
                                {menu.submenuItems.map((item, i) => (
                                    <li key={i} className="text-white flex items-center mb-1 p-2 ps-10 gap-x-4 cursor-pointer rounded hover:bg-primary-600">
                                        <Link className={`text-md font-medium`} to={item.link}>{item.title}</Link>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </React.Fragment>
                ))}

                <li>
                    <button className="text-white flex items-center mb-2 p-2 gap-x-4 cursor-pointer rounded hover:bg-primary-600"
                        onClick={logoutHandler}
                    >
                        <span className="text-2xl block float-left" ><AiOutlineLogout /></span>
                        <span className={`text-md font-medium ${!open && 'hidden'} `} >
                            Log Out
                        </span>
                    </button>
                </li>
            </ul>
        </div>

    )
}

export default SideBar