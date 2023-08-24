import { useParams } from "react-router-dom"
import { VideoCall } from "../../_components/userComponents"

const MeetDoctorPage = () => {
    const { docSokId } = useParams()
    return (
        <>
            <VideoCall docSokId={docSokId} />
        </>
    )
}

export default MeetDoctorPage