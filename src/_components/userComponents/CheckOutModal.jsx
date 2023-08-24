import AxiosBackend from '../../config/axios'
import { useEffect, useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import toast, { Toaster } from 'react-hot-toast';

const CheckOutModal = ({ setShowModal, docId, date, timeId }) => {
    const [details, setDetails] = useState('')

    const getAppointmentDetails = async (docId, date, timeId) => {
        try {
            const response = await AxiosBackend.post('/api/user/appointment/details', { docId, date, timeId })
            setDetails(response.data.details)
        } catch (error) {
            setShowModal(false)
            toast.error('Something wrong')

        }
    }

    useEffect(() => {
        getAppointmentDetails(docId, date, timeId)

    }, [])


    return (
        <>
            <div
                className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            >
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                    {/*content*/}
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        {/*header*/}
                        <div className="flex items-start justify-between p-3 border-b border-solid border-slate-200 rounded-t">
                            <h3 className="text-md text-primary-600 font-semibold">
                                Appointment 
                            </h3>
                            <button
                                onClick={() => setShowModal(prev => !prev)}
                            >
                                <span className='text-red-500'>
                                    <AiOutlineClose />
                                </span>
                            </button>
                        </div>
                        {/*body*/}
                        <div className='p-5 font-semibold'>
                            <h1>Name: <span className='ps-2'>Dr. {details.fname} {details.lname}</span></h1>
                            <p>Dep: <span className='ps-2'>{details.department}</span></p>
                            <p>Date: <span className='ps-2'>{details.date}</span></p>
                            <p>Time: <span className='ps-2'>{details.startTime}-{details.endTime}</span></p>
                            <p>Fees: <span className='ps-2'>₹ {details.fees}</span></p>
                            <div className='text-center'>
                                <button className='mb-2 mt-4 bg-primary border-primary border-2 text-white py-1 px-6 rounded hover:bg-primary-600 duration-200'
                                >Proceed to pay</button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    )
}

export default CheckOutModal