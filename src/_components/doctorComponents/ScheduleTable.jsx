import { useMemo } from 'react';
import { useTable } from 'react-table';
import moment from 'moment'
import { IoCloseSharp } from 'react-icons/io5'



const ScheduleTable = ({ handleDeleteSchedule, schedules}) => {
    const data = schedules
    const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const columns = useMemo(
        () => [
            {
                Header: 'Day',
                accessor: 'day',
                Cell: ({ cell: { value } }) => weekday[value]
            },
            {
                Header: 'Time',
                accessor: 'startTime',
                Cell: ({ cell: { row } }) => moment(row.original.startTime).format('h:mm A') + ' - ' + moment(row.original.endTime).format('h:mm A')
            },
            {
                Header: '',
                accessor: '_id',
                Cell: ({ value }) => (
                    <button className='border rounded' onClick={() => handleDeleteSchedule(value)}>
                        <IoCloseSharp className='text-red-800 font-bold' />
                    </button>
                )
            }
        ],
        []
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data });

    return (
        <div className='w-full  p-10'>
            <table {...getTableProps()} className='text-center w-full table-auto shadow-lg bg-white'>
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}  style={{ borderBottom: '1px solid black' }}>
                            {headerGroup.headers.map((column) => (
                                <th {...column.getHeaderProps()} className=' bg-primary-500 border  px-8 py-4'>
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
                            <tr {...row.getRowProps()} className='even:bg-primary-100'>
                                {row.cells.map((cell) => (
                                    <td {...cell.getCellProps()} className='border-2 px-8 py-4'>
                                        {cell.render('Cell')}
                                    </td>
                                ))}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default ScheduleTable