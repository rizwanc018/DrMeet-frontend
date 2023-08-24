import { useParams } from "react-router-dom"
import { VideoCall } from "../../_components/doctorComponents"

const ConsultationPage = () => {
    const { patientId } = useParams()
    return (
        <div className="">
            <VideoCall patientId={patientId} />
        </div>
    )
}

export default ConsultationPage