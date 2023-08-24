import { useEffect, useState } from 'react'
import axios from 'axios'
import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Tooltip,
    Legend
} from 'recharts';


const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const DonutChart = () => {
    const [data, setData] = useState([])

    const getAppointmentsPerWeekDay = async () => {
        const response = await axios.get('/api/admin/appointments/weekday/data')
        setData(response.data.data)
    }

    useEffect(() => {
        getAppointmentsPerWeekDay()
    }, [])

    return (

        <div className='col-span-2 row-span-2'>
            <ResponsiveContainer width="100%" height='100%'>
                <PieChart
                    margin={{ left: 100 }}
                >
                    <text className='font-bold' x={100} y={30} textAnchor="middle" dominantBaseline="middle">
                    Appointment/Day
                    </text>
                    <Pie
                        data={data}
                        cx={120}
                        cy={200}
                        innerRadius={60}
                        outerRadius={80}
                        fill="#8884d8"
                        paddingAngle={5}
                        dataKey="count"
                        nameKey='dayOfWeek'
                        label='true'
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip
                        contentStyle={{ background: "hsl(168, 50%, 82%)", border: "none", borderRadius: "5px" }}
                    />
                    <Legend
                        payload={
                            data.map(
                                (item, index) => ({
                                    id: item.dayOfWeek,
                                    type: "wye",
                                    value: `${item.dayOfWeek} (${item.count})`,
                                    color: COLORS[index % COLORS.length]
                                })
                            )
                        }
                    />
                </PieChart>
            </ResponsiveContainer>
        </div >
    )
}

export default DonutChart