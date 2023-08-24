import moment from 'moment'
import { useMemo, useState } from 'react'
import { useTable } from 'react-table'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'
import Swal from 'sweetalert2'


const Appointments = ({ data, getUpcomingAppointments }) => {
    const [date, setDate] = useState(moment().startOf('day').toISOString())
    const [showSpinner, setShowSpinner] = useState(false)

    const handleCancel = async (appointmentId, payment_intent, appointmentDate) => {
        Swal.fire({
            title: 'Are tou sure, you want to cancel the appointment?',
            showCancelButton: true,
            cancelButtonColor:'green',
            confirmButtonText: 'Yes',
            confirmButtonColor: 'red',
        }).then((result) => {
            if (result.isConfirmed) {
                cancelAppointment(appointmentId, payment_intent, appointmentDate)
            }
        })
    }

    const cancelAppointment = async (appointmentId, payment_intent, appointmentDate) => {
        const today = moment().startOf('day')
        const oneDayBeforeAppointment = moment(appointmentDate).subtract(1, 'days')
        if (today.isBefore(oneDayBeforeAppointment)) {
            try {
                setShowSpinner(true)
                const response = await axios.post('/api/stripe/refund', { appointmentId, payment_intent })
                if (response.data.success) {
                    setShowSpinner(false)
                    toast.success(response.data.msg)
                    getUpcomingAppointments(date)
                }
                else
                    toast.error(response.data.msg)
            } catch (error) {
                toast.error('Error cancelling appointment')
            }
        } else {
            toast.error('Apppointment can only cancelled one day before appointment date')
        }
    }

    const columns = useMemo(
        () => [
            {
                Header: '#',
                accessor: 'rowNumber',
                Cell: ({ row }) => <div>{row.index + 1}</div>,
            },
            {
                Header: 'Booking Date',
                accessor: 'createdAt',
                Cell: ({ cell: { value } }) => (
                    moment(value).format('YYYY-MM-DD')
                ),
            },
            {
                Header: 'Doctor',
                Cell: ({ cell: { row } }) => (
                    row.original.docId.fname + ' ' + row.original.docId.lname
                )
            },
            {
                Header: 'Appointmnent Date',
                accessor: 'date',
                Cell: ({ cell: { value } }) => (
                    moment(value).format('YYYY-MM-DD')
                ),
            },
            {
                Header: 'Time',
                accessor: 'timeId.startTime',
                Cell: ({ cell: { row } }) => (
                    moment(row.original.timeId.startTime).format('hh:mm a') + ' - ' + moment(row.original.timeId.endTime).format('hh:mm a')
                )
            },
            {
                Header: 'Action',
                accessor: '',
                Cell: ({ row }) => (
                    <div className='flex flex-col gap-2'>
                        <button
                            className='inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-sm focus:bg-primary-600 focus:shadow-sm focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-sm'
                            onClick={() => handleCancel(row.original._id, row.original.payment_intent, row.original.date)}
                        >Cancel</button>
                    </div>
                )
            },
        ], []
    )


    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data });

    return (
        <>
            <div className='mt-10 mx-4 mb-16 overflow-x-auto'>
                <Toaster />
                {data && data.length === 0 ? (<h1 className="mt-10 p-10 font-bold text-3xl">No Upcomming Appointments</h1>) : (
                    <div className=' overflow-x-auto'>
                        <table {...getTableProps()} className='text-center w-auto table-auto shadow bg-white'>
                            <thead>
                                {headerGroups.map((headerGroup) => (
                                    <tr {...headerGroup.getHeaderGroupProps()} style={{ borderBottom: '1px solid black' }}>
                                        {headerGroup.headers.map((column) => (
                                            <th {...column.getHeaderProps()} className='bg-primary-500 w-fit border text-center px-8 py-2'>
                                                {column.render('Header')}
                                            </th>
                                        ))}
                                    </tr>
                                ))}
                            </thead>
                            <tbody {...getTableBodyProps()}>
                                {rows.map((row) => {
                                    prepareRow(row);
                                    return (
                                        <tr {...row.getRowProps()} className='even:bg-primary-100 '>
                                            {row.cells.map((cell) => (
                                                <td {...cell.getCellProps()} className='capitalize border-2 px-8 py-2'>
                                                    {cell.render('Cell')}
                                                </td>
                                            ))}
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </>
    )
}

export default Appointments
