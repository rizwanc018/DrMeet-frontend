import { useEffect, useState } from 'react'
import axios from 'axios'
import moment from 'moment'
import Appointments from '../../_components/userComponents/Appointments'
import Spinner from "../../_components/Spinner";

const AppointmentsPage = () => {
    const [date, setDate] = useState(moment().startOf('day').toISOString())
    const [data, setData] = useState()
    const [openTab, setOpenTab] = useState(1);

    const getUpcomingAppointments = async (date) => {
        let response
        if (openTab === 1) {
            response = await axios.get('/api/user/appointments')
        } else {
            response = await axios.get('/api/user/appointments/all')
        }
        setData(response.data.appointments)
    }

    useEffect(() => {
        getUpcomingAppointments(date)
    }, [date, openTab])

    return (
        <>
            <div className="flex flex-wrap">
                <div className="w-full">
                    <ul
                        className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
                        role="tablist"
                    >
                        <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                            <a
                                className={
                                    "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                                    (openTab === 1
                                        ? "text-white bg-" + 'primary' + "-600"
                                        : "text-" + 'primary' + "-600 bg-white")
                                }
                                onClick={e => {
                                    e.preventDefault();
                                    setOpenTab(1);
                                }}
                                data-toggle="tab"
                                href="#link1"
                                role="tablist"
                            >
                                Coming
                            </a>
                        </li>
                        <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                            <a
                                className={
                                    "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                                    (openTab === 2
                                        ? "text-white bg-" + 'primary' + "-600"
                                        : "text-" + 'primary' + "-600 bg-white")
                                }
                                onClick={e => {
                                    e.preventDefault();
                                    setOpenTab(2);
                                }}
                                data-toggle="tab"
                                href="#link2"
                                role="tablist"
                            >
                                All
                            </a>
                        </li>
                    </ul>
                    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6  rounded">
                        <div className="px-4 py-5 flex-auto">
                            <div className="tab-content tab-space">
                                {/* <div className={openTab === 1 ? "block" : "hidden"} id="link1"> */}
                                <div id="link1">
                                    <div className='flex justify-center'>
                                        {
                                            data ? (<Appointments data={data} getUpcomingAppointments={getUpcomingAppointments} />) :
                                                <div className='my-28'>
                                                    <Spinner />
                                                </div>
                                        }
                                    </div>
                                </div>
                                {/* <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                                    <p>
                                        Completely synergize resource taxing relationships via
                                        premier niche markets. Professionally cultivate one-to-one
                                        customer service with robust ideas.
                                        <br />
                                        <br />
                                        Dynamically innovate resource-leveling customer service for
                                        state of the art customer service.
                                    </p>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AppointmentsPage