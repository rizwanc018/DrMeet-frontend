import React, { useEffect } from 'react'
import AddButton from '../AddButton'
import { Link } from 'react-router-dom'

const Hero = ({ userInfo, setShowModal }) => {
    

    return (
        <div className='flex flex-col md:flex-row items-center p-4 bg-primary-100 shadow-md m-4 mx-14 rounded '>
            <div className='flex-1 flex flex-col md:flex-row  gap-6 items-center'>
                <img src={userInfo.image} alt="" className='rounded-full w-36 ' />
                <div className='text-center'>
                    <p className='font-semibold text-3xl'>Dr. {userInfo.fname} {userInfo.lname}</p>
                    <p>{userInfo.degree}</p>
                    <p className='text-gray-600'>{userInfo.department}</p>
                    <p className='mt-2'>Experience : <span className=''>{userInfo.experience} yrs</span></p>
                </div>
            </div>
            <div className='flex-1'>
                <p className='invisible md:visible'>{userInfo.bio}</p>
                <div className='flex flex-wrap justify-center gap-4 mt-2'>
                    <Link to='/doctor/schedules' className='border-2 border-primary p-2 px-6 rounded text-emerald-600 hover:text-white hover:bg-primary active:text-white active:bg-primary'>Schedules
                    </Link>
                    <Link to='/doctor/appointments' className='border-2 border-primary p-2 px-6 rounded text-emerald-600 hover:text-white hover:bg-primary active:text-white active:bg-primary'>Appointments
                    </Link>
                    <AddButton text={'Add Schedule'} setShowModal={setShowModal} />
                </div>
            </div>
        </div>
    )
}

export default Hero