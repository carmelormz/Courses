import { redirect } from 'react-router-dom';
import EventForm from '../components/EventForm';

export default function NewEventPage() {
  return <EventForm />;
}

export const action = async ({ request, params }) => {
  const data = await request.formData();

  // Ex. const title = data.get('title');
  const eventData = {
    title: data.get('title'),
    image: data.get('image'),
    date: data.get('date'),
    description: data.get('description'),
  };

  const response = await fetch('http://localhost:8080/events', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(eventData),
  });

  if (!response.ok) {
    throw new Response(
      JSON.stringify({
        message: 'Could not save event.',
      }),
      {
        status: 500,
      }
    );
  }

  return redirect('/events');
};
