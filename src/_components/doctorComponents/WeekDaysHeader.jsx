import moment from "moment";
import { useState } from "react"


const WeekDaysHeader = ({ setDay }) => {
    const [selectedDay, setSelectedDay] = useState(moment().weekday());

    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const handleItemClick = (dayIndex) => {
        setSelectedDay(dayIndex)
        setDay(dayIndex)
    }

    return (
        <>
            <span className=" flex flex-wrap justify-center gap-4 bg-white">
                {weekdays.map((weekday, index) => (
                    <button
                        key={index}
                        className={` px-4 py-2 cursor-pointer border border-primary-700 rounded ${selectedDay === index ? 'bg-primary-700 text-white' : 'text-primary-700'
                            }`}
                        onClick={() => handleItemClick(index)}
                    >
                        {weekday}
                    </button>
                ))}
            </span>
        </>

    )
}

export default WeekDaysHeader