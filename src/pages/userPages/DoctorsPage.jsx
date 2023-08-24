import { useEffect, useState } from "react"
import { DoctorCard, SearchDoctor } from "../../_components/userComponents"
import axios from "axios"
import Spinner from "../../_components/Spinner"
import { useLocation, useSearchParams } from 'react-router-dom';


const DoctorsPage = () => {
  const [doctors, setDoctors] = useState()
  const [searchParams, setSearchParams] = useSearchParams();
  const param = searchParams.get("q")

  const getAllDoctors = async () => {
    let response
    if (param) {
      response = await axios.get(`/api/user/doctors/${param}`)
    } else {
      response = await axios.get('/api/user/doctors')
    }
    setDoctors(response.data.doctors)
  }

  useEffect(() => {
    getAllDoctors()
  }, [])

  return (
    <>
      <div className=" flex flex-wrap justify-between items-center w-full mt-4 mb-6 p-4 px-12 bg-slate-100">
        <h1 className="text-xl">Doctors Available</h1>
        <SearchDoctor setDoctors={setDoctors} />
      </div>
      {
        doctors ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mx-8 pt-10 pb-14 bg-white">
            {doctors.map((doctor, i) => (
              <DoctorCard doctor={doctor} key={i} className='w-full' />
            ))}
          </div>
        ) : (
          <div className="flex flex-wrap gap-5 justify-center mx-8 mt-12 h-60 bg-white">
            <Spinner />
          </div>
        )
      }
    </>
  )
}

export default DoctorsPage