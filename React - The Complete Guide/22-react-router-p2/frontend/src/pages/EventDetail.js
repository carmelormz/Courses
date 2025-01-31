import { useRouteLoaderData } from 'react-router-dom';
import EventItem from '../components/EventItem';

export default function EventDetailPage() {
  const { event } = useRouteLoaderData('event-detail');
  return <EventItem event={event} />;
}

export const loader = async ({ request, params }) => {
  const response = await fetch(`http://localhost:8080/events/${params.id}`);

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

  return response;
};
