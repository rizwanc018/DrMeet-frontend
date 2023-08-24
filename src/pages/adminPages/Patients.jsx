import React from 'react'
import { PatientsTable } from '../../_components/adminComponents'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Spinner from '../../_components/Spinner'
import toast, { Toaster } from 'react-hot-toast';

function Patients() {
    const [data, setData] = useState('')

    const getAllPatients = async () => {
        const response = await axios.get(`/api/admin/patients/`)
        setData(response.data.patients)
    }

    useEffect(() => {
        getAllPatients()
    }, [])

    const handleBlock = async (id) => {
        const response = await axios.put(`/api/admin/block/patient/${id}`)
        toast.success(response.data.msg)
        getAllPatients()
    }

    return (
        <>
            <Toaster />
            {data ? (
                <PatientsTable data={data} handleBlock={handleBlock} />
            ) : (
                <div className='flex justify-center mt-10'>
                    <Spinner />
                </div>
            )}
        </>
    )
}

export default Patients