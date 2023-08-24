import React from 'react'
import { MdOutlineDone } from 'react-icons/md'
import { useNavigate, Link } from "react-router-dom";

const AppointmentSuccess = () => {


  const navigate = useNavigate();

  return (
    <div className='grid h-64 grid-cols-1 place-items-center  mt-36' >
      <MdOutlineDone className='font-extrabold text-primary text-9xl' />
      <h1 className='text-5xl'>Appointment Booked Succesfully</h1>
      <Link to='/appointments' className='mt-3 rounded bg-primary text-white p-2 px-4 hover:bg-primary-600 focus:hover:bg-primary-600 active:hover:bg-primary-600'>Appointments</Link>
    </div>
  )
}

export default AppointmentSuccess