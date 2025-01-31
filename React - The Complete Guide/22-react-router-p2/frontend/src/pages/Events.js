import { useLoaderData } from 'react-router-dom';

import EventsList from '../components/EventsList';

export default function EventsPage() {
  const { events } = useLoaderData();
  return <EventsList events={events} />;
}

export const loader = async () => {
  const response = await fetch('http://localhost:8080/events');

  if (!response.ok) {
    throw new Response(JSON.stringify({ message: 'Could not fetch events.' }), {
      status: 500,
    });
  }

  return response;
};
