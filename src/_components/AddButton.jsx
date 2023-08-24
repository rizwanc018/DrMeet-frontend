import { HiPlus } from "react-icons/hi";

function AddButton(props) {
    return (
        <button className={`flex items-center gap-2 border-2 border-primary p-2 px-6 rounded text-emerald-600
        hover:text-white hover:bg-primary active:text-white active:bg-primary ${props.pos}`}
            onClick={() => props.setShowModal(prev => !prev)}
        >
            <HiPlus /> {props.text}
        </button>
    )
}

export default AddButton