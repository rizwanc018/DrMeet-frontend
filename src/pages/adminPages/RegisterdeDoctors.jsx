import React from 'react'
import { RegisteredDoctorsTable } from '../../_components/adminComponents'
import { useState, useEffect } from 'react'
import AxiosBackend from '../../config/axios'
import Spinner from '../../_components/Spinner'
import toast, { Toaster } from 'react-hot-toast';

function RegisterdeDoctors() {
  const [data, setData] = useState('')

  const getUnapprovedDoctors = async () => {
    const response = await AxiosBackend.get(`/api/admin/doctors/unapproved`)
    setData(response.data.unapprovedDoctors)
  }

  useEffect(() => {
    getUnapprovedDoctors()
  }, [])

  const handleApprove = async (id) => {
    const response = await AxiosBackend.get(`/api/admin/approve/doctor/${id}`)
    toast.success(response.data.msg)
    getUnapprovedDoctors()
  }

  const handleDelete = async (id) => {
    const response = await AxiosBackend.put(`/api/admin/block/doctor/${id}`)
    toast.success(response.data.msg)
    getUnapprovedDoctors()
  }

  return (
    <>
        <Toaster />

        {data ? (
            data.length > 0 ? 
            (<RegisteredDoctorsTable data={data} handleApprove={handleApprove} handleDelete={handleDelete} />) : 
            (<p  className='w-full font-semibold text-2xl text-center mt-10'>No pending Approval Requests</p>)

        ) : (
            <div className='w-full h-full grid place-items-center'>
                <Spinner />
            </div>
        )}
    </>
)
}

export default RegisterdeDoctors