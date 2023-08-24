import { useEffect, useState } from 'react'
import { SiRescuetime } from 'react-icons/si'
import AxiosBackend from '../../config/axios'

const Slots = () => {
    const [SlotsCount, setSlotsCount] = useState(0)

    const getSlotsCount = async () => {
        const response = await AxiosBackend.get('/api/doc/slots')
        setSlotsCount(response.data.count)
    }

    useEffect(() => {
        getSlotsCount()
    }, [])

    return (
        <div className='bg-white shadow-md rounded-xl p-4 '>
            <div className='w-fit p-2 border-2 border-primary-200 rounded-xl mb-3'>
                <SiRescuetime className='text-primary text-3xl' />
            </div>
            <p className='text-xl mb-3 font-medium'>Slots</p>
            <p className='text-5xl text-primary-700 font-semibold'>{SlotsCount}</p>
        </div>
    )
}

export default Slots