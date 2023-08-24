import React from 'react'
import { IoWarning } from 'react-icons/io5'
import { useNavigate, Link } from "react-router-dom";

const NotFound = () => {


    const navigate = useNavigate();

    return (
        // <div className='grid h-64 grid-cols-1 place-items-center  mt-36' >
        <div className='grid h-screen grid-cols-1 place-items-center' >
            <div className='text-center'>
                <h1 className='text-9xl'>404</h1>
                <h1 className=' flex justify-center text-4xl mt-10'><IoWarning />Oops! Page not found!</h1>
            </div>
        </div>
    )
}

export default NotFound