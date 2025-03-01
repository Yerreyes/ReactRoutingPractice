// Challenge / Exercise

// 1. Add five new (dummy) page components (content can be simple <h1> elements)
//    - HomePage
//    - EventsPage
//    - EventDetailPage
//    - NewEventPage
//    - EditEventPage
// 2. Add routing & route definitions for these five pages
//    - / => HomePage
//    - /events => EventsPage
//    - /events/<some-id> => EventDetailPage
//    - /events/new => NewEventPage
//    - /events/<some-id>/edit => EditEventPage
// 3. Add a root layout that adds the <MainNavigation> component above all page components
// 4. Add properly working links to the MainNavigation
// 5. Ensure that the links in MainNavigation receive an "active" class when active
// 6. Output a list of dummy events to the EventsPage
//    Every list item should include a link to the respective EventDetailPage
// 7. Output the ID of the selected event on the EventDetailPage
// BONUS: Add another (nested) layout route that adds the <EventNavigation> component above all /events... page components

import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import HomePage from "./components/pages/HomePage";
import EventsPage, {loader as eventLoader} from "./components/pages/Events";
import EditEventPage from "./components/pages/EditEventPage";
import NewEventPage from "./components/pages/NewEventPage";
import EventDetailPage from "./components/pages/EventDetailPage";
import Layout from "./components/Layout";
import EventsRoot from "./components/EventsRoot";
import ErrorPage from "./components/pages/Error";

const routes = createRoutesFromElements(
  <>
    {/**here I made a nested routes for the layout */}
    <Route path="/" element={<Layout />} errorElement= { <ErrorPage />}>
      <Route index element={<HomePage />} />
      <Route path="events" element={<EventsRoot />}>
        <Route
          index
          path=""
          element={<EventsPage />}
          loader = {eventLoader}
        />
        <Route path=":eventId" element={<EventDetailPage />} />
        <Route path="new" element={<NewEventPage />} />
        <Route path=":eventId/edit" element={<EditEventPage />} />
      </Route>
    </Route>
  </>
);

const router = createBrowserRouter(routes);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
