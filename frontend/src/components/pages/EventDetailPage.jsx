import { useRouteLoaderData, redirect } from "react-router-dom";

import EventItem from "../EventItem";

const EventDetailPage = () => {
  const data = useRouteLoaderData("event-router");
  return (
    <>
      <EventItem event={data.event} />
    </>
  );
};

export default EventDetailPage;

export async function loader({ request, params }) {
  const id = params.eventId;
  const response = await fetch("http://localhost:8080/events/" + id);

  if (!response.ok) {
    const error = new Error("Could not fetch the details of the event");
    error.status = 500;
    error.data = JSON.stringify({
      message: "Could not fetch the details of the event",
    });
    throw error;
  } else {
    return response;
  }
}

export async function action({ params, request }) {
  const id = params.eventId;
  const response = await fetch("http://localhost:8080/events/" + id, {
    method: request.method,
  });

  if (!response.ok) {
    const error = new Error("Could not delete the event");
    error.status = 500;
    error.data = JSON.stringify({ message: "Could not delete the event" });
    throw error;
  }
  return redirect("/events");
}

