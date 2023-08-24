import React from 'react'
import { ApprovedDoctorsTable } from '../../_components/adminComponents'
import { useState, useEffect } from 'react'
import AxiosBackend from '../../config/axios'
import Spinner from '../../_components/Spinner'
import toast, { Toaster } from 'react-hot-toast';

function ApprovedDoctors() {
    const [data, setData] = useState('')

    const getApprovedDoctors = async () => {
        const response = await AxiosBackend.get(`/api/admin/doctors/approved`)
        setData(response.data.appovedDoctors)
    }

    useEffect(() => {
        getApprovedDoctors()
    }, [])

    const handleDelete = async (id) => {
        const response = await AxiosBackend.put(`/api/admin/block/doctor/${id}`)
        toast.success(response.data.msg)
        getApprovedDoctors()
    }

    return (
        <>
            <Toaster />

            {data ? (
                <ApprovedDoctorsTable data={data} handleDelete={handleDelete} />
            ) : (
                <div className='w-full h-full grid place-items-center'>
                    <Spinner />
                </div>
            )}
        </>
    )
}

export default ApprovedDoctors