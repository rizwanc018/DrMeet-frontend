import React, { useEffect, useState } from 'react';
import AxiosBackend from '../../config/axios'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

const AppointmetntsChart = () => {
  const [data, setData] = useState([])

  const getAppointments = async () => {
    const response = await AxiosBackend.get('/api/doc/appointments/data')
    setData(response.data.data)
  }

  useEffect(() => {
    getAppointments()
  }, [])


  return (
    <div className='col-span-2 row-span-2'>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          width={500}
          height={400}
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <text className='font-bold' x={350} y={30} textAnchor="middle" dominantBaseline="middle">
            Appointment Data
          </text>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="_id" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="count" stroke="#8884d8" fill="#8884d8" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AppointmetntsChart;
