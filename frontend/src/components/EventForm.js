import { useNavigate, Form, useNavigation, useActionData, redirect } from 'react-router-dom';

import classes from './EventForm.module.css';

function EventForm({ method, event }) {
  const data = useActionData(); // This hook takes the data returned by the action
  const navigate = useNavigate();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  function cancelHandler() {
    navigate('..');
  }

  return (
    <Form method= {method}className={classes.form}>
      {data && data.errors && <ul>
        {Object.values(data.errors).map(err=> <li key={err}>{err}</li>)}
        </ul>}
      <p>
        <label htmlFor="title">Title</label>
        <input id="title" type="text" name="title"  defaultValue = {event ? event.title: ''}required />
      </p>
      <p>
        <label htmlFor="image">Image</label>
        <input id="image" type="url" name="image" required defaultValue = {event ? event.image: ''} />
      </p>
      <p>
        <label htmlFor="date">Date</label>
        <input id="date" type="date" name="date" required defaultValue = {event ? event.date: '' }/>
      </p>
      <p>
        <label htmlFor="description">Description</label>
        <textarea id="description" name="description" rows="5" required defaultValue = {event ? event.description: ''}/>
      </p>
      <div className={classes.actions}>
        <button type="button" onClick={cancelHandler} disabled = {isSubmitting}>
          Cancel
        </button>
        <button disabled = {isSubmitting}>Save</button>
      </div>
    </Form>
  );
}

export default EventForm;


export async function action({ request, params }) {
  const formData = await request.formData(); // Obtener datos del formulario
  //const title = data.get('title'); // way to extract the data
  const userData = Object.fromEntries(formData); // Convertir a objeto

  const method = request.method;

  let url = "http://localhost:8080/events/";

  if (method=== 'PATCH'){
    const eventId = params.eventId;
    url = "http://localhost:8080/events/" + eventId;
  }

  const response = await fetch(url, {
    method: method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });

  if (response.status === 422){ // if it is true, it is a custom error that backend return thus validation wrong
    return response;
  }

  if (!response.ok) {
    const error = new Error("Could not save the data");
    error.status = 500;
    error.data = JSON.stringify({
      message: "Could not save the data",
    });
    throw error;
  } 

  return redirect('/events')
}

