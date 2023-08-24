import React, { Fragment, useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Menu, Transition } from '@headlessui/react'
import { RiArrowDropDownLine } from 'react-icons/ri'
import { clearCredentials } from '../../slices/authSlice'
import { AiOutlineLogout } from 'react-icons/ai'



function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}


function DropDown({handleShowNavMenu}) {
    const [isOpen, setIsOpen] = useState(false)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { userInfo } = useSelector(state => state.auth)

    const logoutHandler = async () => {
        const response = await axios.get('/api/user/logout')
        if (response.data.success)
            dispatch(clearCredentials())
        navigate('/')
    }

    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <Menu.Button className="inline-flex w-full capitalize justify-center items-center gap bg-white px-3 py-1  font-semibold rounded ring-1 ring-inset ring-primary hover:bg-primary-600 hover:text-white">
                    {userInfo.fname} {userInfo.lname}
                    <RiArrowDropDownLine className="-mr-1 h-5 w-5 text-xl" aria-hidden="true" />
                </Menu.Button>
            </div>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="absolute md:right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                        <Menu.Item>
                            {({ active }) => (
                                <Link
                                    to="/appointments"
                                    onClick={handleShowNavMenu}
                                    className={classNames(
                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                        'block px-4 py-2 '
                                    )}
                                >
                                    Appointments
                                </Link>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <button
                                    onClick={logoutHandler}
                                    className={classNames(
                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                        'w-full px-4 py-2 text-left flex gap-1.5 items-center'
                                    )}
                                >
                                   <AiOutlineLogout className='font-bold'/> Sign out
                                </button>
                            )}
                        </Menu.Item>
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    )
}

export default DropDown
