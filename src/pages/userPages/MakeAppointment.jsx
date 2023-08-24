import { useParams } from "react-router-dom"
import { DoctorCard, MakeAppointmentForm } from "../../_components/userComponents"
import { useEffect, useState } from "react"
import AxiosBackend from '../../config/axios'

const MakeAppointment = () => {
  const [doctor, setDoctor] = useState('')
  const [scheduleDays, setScheduleDays] = useState([])
  const { id } = useParams()

  const fetchData = async (id) => {
    try {
      const [doctorResponse, scheduleResponse] = await Promise.all([
        AxiosBackend.get(`/api/user/doctor/${id}`),
        AxiosBackend.get(`/api/user/doctor/schedule/days/${id}`)
      ]);

      setDoctor(doctorResponse.data.doctor);
      setScheduleDays(scheduleResponse.data.days?.map(day => Number(day)) || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData(id)
  }, [id])

  return (
    <>
      <div className=" flex justify-between items-center w-full mt-4 mb-6 p-4 px-12 bg-slate-100">
        <h1 className="text-xl">Book appointment</h1>
      </div>
      <div className="w-full px-12 mt-8 pt-8 py-14 flex items-start justify-center md:justify-around">
        {doctor && <DoctorCard width={'w-1/4'} visibility={'invisible md:visible'} doctor={doctor} showBookbutton={false} />}
        {scheduleDays && <MakeAppointmentForm schedule={scheduleDays} id={id} />}
      </div>
    </>
  )
}

export default MakeAppointment