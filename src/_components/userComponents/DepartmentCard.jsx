import { Link } from "react-router-dom";

const DepartmentCard = ({ department }) => {
    return (
        <div className='w-full flex-shrink-0 shadow-xl py-4 border-1 my-6'>
            <div className='flex justify-center'>
                <img src={department.image} className='' alt={department.name} />
            </div>
            <div className='px-6 py-4 text-center'>
                <h1 className='font-bold text-xl'>{department.name}</h1>
                <p>{department.description}</p>
                <Link to={`/doctors?q=${department._id}`} className='block mt-3 p-1 px-4 rounded text-emerald-600 active:text-white'
                >Consoult now {`>`} </Link>
            </div>
        </div>
    );
};


export default DepartmentCard