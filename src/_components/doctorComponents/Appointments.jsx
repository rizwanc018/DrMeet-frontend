import { useEffect, useState } from 'react'
import { IoCalendar } from 'react-icons/io5'
import AxiosBackend from '../../config/axios'

const Appointments = () => {
    const [AppointmentsCount, setAppointmentsCount] = useState(0)

    const getAppointmentsCount = async () => {
        const response = await AxiosBackend.get('/api/doc/appointment/count')
        setAppointmentsCount(response.data.count)
    }

    useEffect(() => {
        getAppointmentsCount()
    }, [])

    return (
        <div className='bg-white shadow-md rounded-xl p-4'>
            <div className='w-fit p-2 border-2 border-primary-200 rounded-xl mb-3'>
                <IoCalendar className='text-primary text-3xl' />
            </div>
            <p className='text-xl mb-3 font-medium'>Appointments</p>
            <p className='text-5xl text-primary-700 font-semibold'>{AppointmentsCount}</p>
        </div>
    )
}

export default Appointments