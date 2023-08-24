import { useEffect, useState } from 'react'
import { FaUserInjured } from 'react-icons/fa6'
import axios from 'axios'

const Patients = () => {
    const [PatientsCount, setPatientsCount] = useState(0)

    const getPatientsCount = async () => {
        const response = await axios.get('/api/admin/patient/count')
        setPatientsCount(response.data.count)
    }

    useEffect(() => {
        getPatientsCount()
    }, [])

    return (
        <div className='bg-white shadow-md rounded-xl p-4'>
            <div className='w-fit p-2 border-2 border-primary-200 rounded-xl mb-3'>
                <FaUserInjured className='text-primary text-3xl' />
            </div>
            <p className='text-xl mb-3 font-medium'>Patients</p>
            <p className='text-5xl text-primary-700 font-semibold'>{PatientsCount}</p>
        </div>
    )
}

export default Patients