import { useLoaderData, Await } from 'react-router-dom';

import EventsList from '../components/EventsList';
import { Suspense } from 'react';

export default function EventsPage() {
  const { events: eventsPromise } = useLoaderData();

  return (
    <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
      <Await resolve={eventsPromise}>
        {(loadedEvents) => <EventsList events={loadedEvents} />}
      </Await>
    </Suspense>
  );
}

const loadEvents = async () => {
  const response = await fetch('http://localhost:8080/events');

  if (!response.ok) {
    throw new Response(JSON.stringify({ message: 'Could not fetch events.' }), {
      status: 500,
    });
  }

  const resData = await response.json();
  return resData.events;
};

export const loader = () => {
  return {
    events: loadEvents(),
  };
};
