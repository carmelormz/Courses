import { Await, redirect, useRouteLoaderData } from 'react-router-dom';
import EventItem from '../components/EventItem';
import EventsList from '../components/EventsList';
import { Suspense } from 'react';

export default function EventDetailPage() {
  const { event: eventPromise, events: eventsPromise } =
    useRouteLoaderData('event-detail');

  return (
    <>
      <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
        <Await resolve={eventPromise}>
          {(loadedEvent) => <EventItem event={loadedEvent} />}
        </Await>
      </Suspense>
      <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
        <Await resolve={eventsPromise}>
          {(loadedEvents) => <EventsList events={loadedEvents} />}
        </Await>
      </Suspense>
    </>
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

const loadEvent = async (id) => {
  const response = await fetch(`http://localhost:8080/events/${id}`);

  if (!response.ok) {
    throw new Response(
      JSON.stringify({
        message: 'Could not fetch details for selected event.',
      }),
      {
        status: 500,
      }
    );
  }

  const resData = await response.json();

  return resData.event;
};

export const loader = async ({ request, params }) => {
  return {
    events: loadEvents(),
    event: loadEvent(params.id),
  };
};

export const action = async ({ request, params }) => {
  const response = await fetch(`http://localhost:8080/events/${params.id}`, {
    method: request.method,
  });

  if (!response.ok) {
    throw new Response(JSON.stringify({ message: 'Could not delete event.' }), {
      status: 500,
    });
  }

  return redirect('/events');
};
