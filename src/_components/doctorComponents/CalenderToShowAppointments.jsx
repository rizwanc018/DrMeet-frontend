import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './CalenderTiShowAppointments.css'
import moment from 'moment';
import { useEffect, useState } from 'react';
import axios from 'axios';


const CalenderToShowAppointments = ({ date, setDate }) => {
  const [givenDates, setgivenDates] = useState()

  const appointmetDates = async () => {
    const response = await axios.get('/api/doc/appointment/dates')
    setgivenDates(response.data.dates.map(d => moment(d.date)))
  }

  useEffect(() => {
    appointmetDates()
  }, [])


  const dateIsDisabled = (d) => {
    const momentDate = moment(d);
    return !givenDates.some((givenDate) => givenDate.isSame(momentDate, 'day'));
  }

  const handleChange = (d) => {
    setDate(moment(d).startOf('day'))
  }

  return (
    <div className="w-full md:w-auto md:flex-grow-0">
      {givenDates &&
        <Calendar
          onChange={(date) => handleChange(date)}
          value={date}
          tileDisabled={({ date }) => dateIsDisabled(date)}
        />
      }
    </div>
  )
}

export default CalenderToShowAppointments