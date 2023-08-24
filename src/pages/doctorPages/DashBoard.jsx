// import { Doctors, Patients, , DonutChart } from "../../_components/adminComponents"
import { Appointments, Earnings, ScheduleDays, Slots, AppointmetntsChart } from '../../_components/doctorComponents'

const DashBoard = () => {
    return (
        <div className="h-full w-full bg-primary-100 px-6 py-6 mb-6">
            <div className="grid grid-cols-2  md:grid-cols-4 auto-rows-[minmax(160px,auto)] gap-6 max-h-screen overflow-y-auto">
                <Appointments />
                <ScheduleDays />
                <AppointmetntsChart />
                <Earnings />
                <Slots />
            </div>
        </div>
    )
}

export default DashBoard