import { useEffect } from 'react'
import { useState } from 'react'
import { CgOptions } from "react-icons/cg";
import AxiosBackend from '../../config/axios';


function DepartmentsTable( props ) {
    const [data, setData] = useState([])
    

    const getAllDepartments = async () => {
        const response = await AxiosBackend.get(`/api/admin/department`)
        setData(response.data.departments)
    }

    useEffect(() => {
        getAllDepartments()
    },[props.show])



    return (
        <div className='w-full'>
            <div className='p-10'>
                <table className='text-center w-full table-auto shadow-lg bg-white'>
                    <thead>
                        <tr>
                            <th className='bg-primary-500 border text-left px-8 py-4'>#</th>
                            <th className='bg-primary-500 border text-left px-8 py-4'>Name</th>
                            <th className='bg-primary-500 border text-left px-8 py-4'>Status</th>
                            <th className='bg-primary-500 border text-left px-8 py-4'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((row, i) => (
                                <tr key={i + 1} className='even:bg-primary-100'>
                                    <td className='border px-8 py-4'>{i + 1}</td>
                                    <td className='border px-8 py-4'>{row.name}</td>
                                    <td className='border px-8 py-4'>
                                        <button className='border-2 border-primary p-1 px-6 rounded text-emerald-600'>
                                            active</button>
                                    </td>
                                    <td className='border px-8 py-4 cursor-pointer text-gray-500'><CgOptions className='mx-auto' /></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default DepartmentsTable