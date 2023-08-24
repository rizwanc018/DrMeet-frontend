import { AppointmentsBooked, CalenderToShowAppointments } from "../../_components/doctorComponents"
import { useEffect, useState, } from "react"
import axios from "axios"
import moment from "moment"
import Spinner from '../../_components/Spinner'

const Appointments = () => {
  const [date, setDate] = useState(moment().startOf('day').toISOString())
  const [data, setData] = useState([])

  const getAppointments = async (date) => {
    const response = await axios.post('/api/doc/appointments', { date })
    setData(response.data.appointments)
  }

  useEffect(() => {
    getAppointments(date)
  }, [date])

  return (
    <div className="w-full flex justify-center py-10 mb-6">
      <div className="w-full flex flex-col items-center md:flex-row md:justify-between px-4">
        <CalenderToShowAppointments date={date} setDate={setDate} />
        <div className="w-full flex justify-center overflow-x-auto mt-4 md:mt-0">
          {data ? <AppointmentsBooked data={data} /> : <div className="flex justify-center"><Spinner /></div>}
        </div>
      </div>
    </div>
  )
}
export default Appointments