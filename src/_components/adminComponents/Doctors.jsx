import { useEffect, useState } from 'react'
import { FaUserDoctor } from 'react-icons/fa6'
import AxiosBackend from '../../config/axios'

const Doctors = () => {
    const [doctorsCount, setDoctorsCount] = useState(0)

    const getDoctorsCount = async () => {
        const response = await AxiosBackend.get('/api/admin/doctor/count')
        setDoctorsCount(response.data.count)
    }

    useEffect(() => {
        getDoctorsCount()
    }, [])

    return (
        <div className='bg-white shadow-md rounded-xl p-4'>
            <div className='w-fit p-2 border-2 border-primary-200 rounded-xl mb-3'>
                <FaUserDoctor className='text-primary text-3xl' />
            </div>
            <p className='text-xl mb-3 font-medium'>Doctors</p>
            <p className='text-5xl text-primary-700 font-semibold'>{doctorsCount}</p>
        </div>
    )
}

export default Doctors