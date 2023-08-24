import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi'
import { GrClose } from 'react-icons/gr'
import { AiOutlineLogin } from 'react-icons/ai'
import { useSelector, useDispatch } from "react-redux";
import DropDown from './DropDown';
import socket from '../../config/socket.js'

const Header = () => {
    const [callTo, setCallTo] = useState()
    const [open, setOpen] = useState(false);
    const navigate = useNavigate()

    const { userInfo } = useSelector(state => state.auth)

    useEffect(() => {
        userInfo ?
            socket.emit('join-room', userInfo?.id, msg => {
            }) : null
    }, [userInfo])

    useEffect(() => {
        socket.emit("get-my-id", id => {
            socket.on('call-id', docId => {
                if (docId) {
                    setCallTo(docId)
                }
            })
        })
    }, [])

    const handleJoin = () => {
        const tmp = callTo
        setCallTo(null)
        navigate(`/meet/${tmp}`)
    }

    const handleShowNavMenu = () => {
        setOpen(prev => !prev);
    }

    return (
        <div className='z-10 shadow-md w-full fixed top-0 left-0 bg-white'>
            <div className='md:flex items-center justify-between bg-white py-1 md:px-10 px-7'>
                <div className='font-bold text-md cursor-pointer flex items-center font-[Poppins] 
          text-gray-800'>
                    <Link to='/' className='text-3xl text-indigo-600 mr-1'>
                        <img src="/assets/logo.png" alt="DrMeet" />
                    </Link>
                </div>

                <div onClick={() => setOpen(!open)} className='text-2xl font-bold absolute right-8 top-6 cursor-pointer md:hidden'>
                    {open ? (<GrClose />) : (<GiHamburgerMenu />)}
                </div>
                <ul className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${open ? 'top-18 ' : 'top-[-490px]'}`}>
                    <li key='Home' className='md:ml-6 text-md md:my-0 my-7'>
                        <Link to='/' onClick={handleShowNavMenu} className='text-gray-800 hover:text-gray-400 duration-500'>Home</Link>
                    </li>
                    <li key='Doctors' className='md:ml-6 text-md md:my-0 my-7'>
                        <Link to='/doctors' onClick={handleShowNavMenu} className='text-gray-800 hover:text-gray-400 duration-500'>Doctors</Link>
                    </li>
                    { !userInfo?.isUser &&
                        <li key='For Doctor' className='md:ml-6 text-md md:my-0 my-7'>
                            <Link to='/doctor' onClick={handleShowNavMenu} className='text-gray-800 hover:text-gray-400 duration-500'>For Doctor</Link>
                        </li>
                    }
                    {userInfo && userInfo.isUser &&
                        <li className='md:ml-6 text-md md:my-0 my-7'>
                            <Link to='/dietitian'
                                className='border border-primary-600 px-2 py-1 rounded text-primary-600 hover:text-white hover:bg-primary-600'
                                onClick={handleShowNavMenu}
                            >AI Dietitian</Link>
                        </li>
                    }
                    {callTo &&
                        <li><button className='animate-ping text-white bg-primary p-1 rounded ml-6 ' onClick={handleJoin}>Join</button></li>
                    }
                    <li className='md:ml-6 text-md md:my-0 my-7'>
                        {
                            userInfo && userInfo.isUser ?
                                (<DropDown handleShowNavMenu={handleShowNavMenu} />)
                                : (<Link to='/login' className='flex items-center gap-1 text-primary font-bold'><AiOutlineLogin className='text-primary font-bold' /> <span>Login</span></Link>)
                        }
                    </li>
                </ul>
            </div>
        </div >
    )
}

export default Header
