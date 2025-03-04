import { useRouteLoaderData } from "react-router-dom";
import EventForm from "../EventForm";

function EditEventPage(){
    const data = useRouteLoaderData('event-router');
    return <EventForm event={data.event} method = "patch"/>
}

export default EditEventPage;