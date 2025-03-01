import { useParams } from "react-router-dom";

const EventDetailPage = () => {
    const parameter = useParams();
    return <>
        <h1>EventDetailPage </h1>
        <p> Event ID: {parameter.eventId}</p>
    </> 
}

export default EventDetailPage;