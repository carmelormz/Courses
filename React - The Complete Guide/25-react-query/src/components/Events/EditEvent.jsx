import {
  Link,
  redirect,
  useNavigate,
  useNavigation,
  useParams,
  useSubmit,
} from 'react-router-dom';

import Modal from '../UI/Modal.jsx';
import EventForm from './EventForm.jsx';
import { useMutation, useQuery } from '@tanstack/react-query';
import { fetchEvent, updateEvent, queryClient } from '../../util/http.js';
import ErrorBlock from '../UI/ErrorBlock.jsx';

export default function EditEvent() {
  const navigate = useNavigate();
  const { id } = useParams();
  const submit = useSubmit();
  const { state } = useNavigation();

  // Eventhough we are using ReactRouter to retrieve the data via the loader(), we still can make use
  // of ReactQuery to have the cache advantages still. This will return the cache data set via the loader.
  const {
    data: event,
    isError,
    error,
  } = useQuery({
    queryKey: ['events', { id }],
    queryFn: (objConf) => fetchEvent({ ...objConf, id }),
  });

  // If using Optimistic Updating:
  // const { mutate } = useMutation({
  //   mutationFn: updateEvent,
  //   onMutate: async (data) => {
  //     // Optimisitc Updating...
  //     const newEvent = data.event;

  //     // Cancel all outgoing queries for the given id, to avoid data clashes
  //     await queryClient.cancelQueries({
  //       queryKey: ['events', { id }],
  //     });

  //     // Retrieve current/old data for rollback purposes, in case the update fails.
  //     const previousEvent = queryClient.getQueryData(['events', { id }]);

  //     // Optimistically update cache data.
  //     queryClient.setQueryData(['events', { id }], newEvent);

  //     return {
  //       previousEvent,
  //     };
  //   },
  //   onError: (error, data, context) => {
  //     queryClient.setQueryData(['events', { id }], context.previousEvent);
  //   },
  //   onSettled: () => {
  //     // Invalidate cache to keep sync between backend and cache data.
  //     queryClient.invalidateQueries(['events', { id }]);
  //   },
  // });

  function handleSubmit(formData) {
    // If using Optimistic Updaing:
    // mutate({ id, event: formData });
    // navigate('../');

    submit(formData, { method: 'PUT' });
  }

  function handleClose() {
    navigate('../');
  }

  let content;

  if (isError) {
    content = (
      <>
        <ErrorBlock
          title='An error ocurred'
          message={error.info?.message || 'Failed to retrieve event details.'}
        />
        <div className='form-actions'>
          <Link to='../' className='button'>
            Okay
          </Link>
        </div>
      </>
    );
  }

  if (event) {
    content = (
      <EventForm inputData={event} onSubmit={handleSubmit}>
        {state === 'submitting' ? (
          <p>Sending data...</p>
        ) : (
          <>
            <Link to='../' className='button-text'>
              Cancel
            </Link>
            <button type='submit' className='button'>
              Update
            </button>
          </>
        )}
      </EventForm>
    );
  }

  return <Modal onClose={handleClose}>{content}</Modal>;
}

export function loader({ params }) {
  return queryClient.fetchQuery({
    queryKey: ['events', { id: params.id }],
    queryFn: (objConf) => fetchEvent({ ...objConf, id: params.id }),
  });
}

export async function action({ request, params }) {
  const formData = await request.formData();
  const updatedEventData = Object.fromEntries(formData);
  await updateEvent({ id: params.id, event: updatedEventData });
  await queryClient.invalidateQueries(['events']);
  return redirect('../');
}
