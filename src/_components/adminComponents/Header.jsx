import React from 'react'

function Header() {
    return (
        <>
        <div className='z-10 shadow-md w-full fixed top-0 left-0 bg-white'>
            <nav className='flex shadow-md justify-between w-screen px-20'>
                <div className='md:flex items-center justify-between bg-white py-2 md:px-10 px-7'>
                    <div className='font-bold text=2x1 cursor-pointer flex items-center text-gray-800'>
                        <img src="/assets/logo.png" alt="DrMeet" />

                    </div>
                </div>
                <p className='font-medium text-2xl flex items-center'>Admin</p>
            </nav>
        </div>
        {/* <div className='h-20'></div> */}
        </>
    )
}

export default Header