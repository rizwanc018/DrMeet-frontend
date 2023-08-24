import { useEffect, useState } from 'react'
import { BsCashStack } from 'react-icons/bs'
import axios from 'axios'

const Earnings = () => {
    const [EarningsCount, setEarningsCount] = useState(0)

    const getEarningsCount = async () => {
        const response = await axios.get('/api/admin/earning')
        setEarningsCount(response.data.earning)
    }

    useEffect(() => {
        getEarningsCount()
    }, [])

    return (
        <div className='bg-white shadow-md rounded-xl p-4 '>
            <div className='w-fit p-2 border-2 border-primary-200 rounded-xl mb-3'>
                <BsCashStack className='text-primary text-3xl' />
            </div>
            <p className='text-xl mb-3 font-medium'>Earnings</p>
            <p className='text-5xl text-primary-700 font-semibold'>₹ {EarningsCount}</p>
        </div>
    )
}

export default Earnings