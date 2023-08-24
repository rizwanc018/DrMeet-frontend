import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const DoctorCard = ({ doctor, showBookbutton, visibility, width  }) => {
    const [showButton, setshowButton] = useState(showBookbutton ?? true)
    return (
        <div className={`${visibility} ${width} rounded overflow-hidden shadow-lg bg-white`}>
            <div className='h-48 overflow-hidden'>
                <img src={doctor.image} className='w-full object-cover ' alt="Sunset in the mountains" />
            </div>
            <div className="px-6 py-4 text-center">
                <h1 className="font-bold text-xl">Dr. {doctor.fname} {doctor.lname}</h1>
                <p>{doctor.department.name}</p>
                <p>Experience: {doctor.experience} yrs</p>
                <p>Fees: ₹ {doctor.fees}</p>
            </div>
            <div className="px-6 pt-1 pb-4 text-center">
                {showButton && <Link to={`/appointment/apply/${doctor._id}`} className='border-2 border-primary p-1 px-4 rounded text-emerald-600
        hover:text-white hover:bg-primary active:text-white active:bg-primary'
                >Book Appointment</Link>
                }
                {!showButton &&
                    <p className='text-left'>{doctor.bio}</p>
                }
            </div>
        </div>
    )
}

export default DoctorCard