import { useState } from 'react'
import { Header, Hero, CreateSchedule } from '../../_components/doctorComponents'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Footer } from "../../_components/userComponents"


const DoctorLayout = () => {

  const [showModal, setShowModal] = useState(false)

  const { userInfo } = useSelector(state => state.auth)
  return (
    <div className='bg-white'>
      <Header />
      <div className="mt-[4.1rem]"></div>
      {userInfo && userInfo.isDoctor && <Hero userInfo={userInfo} setShowModal={setShowModal} />}
      {showModal && <CreateSchedule setShowModal={setShowModal} />}
      <Outlet />
      <Footer/>
    </div>
  )
}

export default DoctorLayout