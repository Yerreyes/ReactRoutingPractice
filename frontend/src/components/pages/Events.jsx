import { useLoaderData, useRouteError, json } from "react-router-dom";
import EventsList from "../EventsList";

function EventsPage() {
  /* that is the way we can fetch data without use loader in the route
  const [isLoading, setIsLoading] = useState(false);
  const [fetchedEvents, setFetchedEvents] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchEvent() {
      setIsLoading(true);

      const responde = await fetch("http://localhost:8080/events");

      if (responde.ok) {
        const restData = await responde.json();
        setFetchedEvents(restData.events);
      } else {
        setError("Fetching events failed.");
      }
      setIsLoading(false);
    }
    fetchEvent();
  }, []);
  */

  const data = useLoaderData();
  const events = data.events;

  return (
    <>
      <EventsList events={events} />
    </>
  );
}

export async function loader() {
  const responde = await fetch("http://localhost:80 80/events");
  if (responde.ok) {
    /* its posible to return it like a object (array evenst), but the useLoaderData hook can get the reponse object like this above. 
    const restData = await responde.json();
    return restData.events;*/
    return responde;
  }
  if (!responde.ok)
    throw new Response(
      JSON.stringify({ message: "Could not fetch data", status: 500 }),
      { status: 500 }
    );
}

export default EventsPage;
