import { AiOutlineClose } from 'react-icons/ai'
import AddScheduleForm from './AddScheduleForm'

const CreateSchedule = ({ setShowModal }) => {
    return (
        <>
            <div
                className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            >
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                    {/*content*/}
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        {/*header*/}
                        <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                            <h3 className="text-2xl text-primary-600 font-semibold">
                                Add Schedule
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
                        <div className='p-8'>
                            <AddScheduleForm />
                        </div>
                    </div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    )
}

export default CreateSchedule