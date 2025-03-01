import { Outlet } from 'react-router-dom';
import EventsNavigation from './EventsNavigation';

function EventsRoot(){
    return <>
        <EventsNavigation/>
        <Outlet/>
    </>
}

export default EventsRoot;