import { useState, useEffect } from 'react'
import { ScheduleTable, WeekDaysHeader } from '../../_components/doctorComponents'
import AxiosBackend from '../../config/axios'
import toast, { Toaster } from 'react-hot-toast'
import { useDispatch, useSelector } from "react-redux";
import { setSchedules } from '../../slices/scheduleSlice';
import moment from 'moment';


function DoctorHome() {
  const [day, setDay] = useState(moment().weekday())
  const dispatch = useDispatch()
  const { schedules } = useSelector(state => state.schedule)

  const getDcotorSchedules = async () => {
    const response = await AxiosBackend.get(`/api/doc/schedule/${day}`)
    dispatch(setSchedules(response.data.schedules))
  }

  useEffect(() => {
    getDcotorSchedules(day)
  }, [day])

  const handleDeleteSchedule = async (id) => {
    try {
      const response = await AxiosBackend.delete(`/api/doc/schedule/${id}`)
      toast.success(response.data.msg)
      dispatch(setSchedules(response.data.schedules))
    } catch (error) {
      toast.error(response.data.msg)
    }
  }
  return (
    <div className='flex flex-col justify-center py-10 mb-6'>
      <Toaster />
      <WeekDaysHeader setDay={setDay} />
      {schedules?.length > 0 ? (<ScheduleTable schedules={schedules} handleDeleteSchedule={handleDeleteSchedule} />
      ) : (
        <h1 className='text-center mt-10 p-10 font-bold text-3xl'>No slots scheduled for today</h1>
      )}
    </div>
  )
}

export default DoctorHome