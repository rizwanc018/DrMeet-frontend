import { useEffect, useState } from 'react'
import { IoCalendar } from 'react-icons/io5'
import AxiosBackend from '../../config/axios'

const ScheduleDays = () => {
    const [ScheduleDaysCount, setScheduleDaysCount] = useState(0)

    const getScheduleDaysCount = async () => {
        const response = await AxiosBackend.get('/api/doc/schedules')
        setScheduleDaysCount(response.data.data)
    }

    useEffect(() => {
        getScheduleDaysCount()
    }, [])

    return (
        <div className='bg-white shadow-md rounded-xl p-4 '>
            <div className='w-fit p-2 border-2 border-primary-200 rounded-xl mb-3'>
                <IoCalendar className='text-primary text-3xl' />
            </div>
            <p className='text-xl mb-3 font-medium'>ScheduleDays</p>
            <p className='text-5xl text-primary-700 font-semibold'> {ScheduleDaysCount}<span className='text-4xl text-gray-500'>/7</span></p>
        </div>
    )
}

export default ScheduleDays