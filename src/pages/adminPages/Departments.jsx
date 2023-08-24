import { useState } from "react"
import AddButton from "../../_components/AddButton"
import { DepartmentsTable, AddDepartmentModal } from "../../_components/adminComponents"

function Departments() {
    const [showModal, setShowModal] = useState(false)

    return (
        <>
            <AddButton pos='ms-auto mt-6 me-10' text='Add Department' setShowModal={setShowModal} />
            {showModal && <AddDepartmentModal setShowModal={setShowModal} />}
            <DepartmentsTable show={showModal} />
        </>
    )
}

export default Departments