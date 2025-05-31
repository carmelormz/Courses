import { Link, useNavigate, useParams } from 'react-router-dom';

import Modal from '../UI/Modal.jsx';
import EventForm from './EventForm.jsx';
import { useMutation, useQuery } from '@tanstack/react-query';
import { fetchEvent, updateEvent, queryClient } from '../../util/http.js';
import LoadingIndicator from '../UI/LoadingIndicator.jsx';
import ErrorBlock from '../UI/ErrorBlock.jsx';

export default function EditEvent() {
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    data: event,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ['events', { id }],
    queryFn: (objConf) => fetchEvent({ ...objConf, id }),
  });
  const { mutate } = useMutation({
    mutationFn: updateEvent,
    onMutate: async (data) => {
      // Optimisitc Updating...
      const newEvent = data.event;

      // Cancel all outgoing queries for the given id, to avoid data clashes
      await queryClient.cancelQueries({
        queryKey: ['events', { id }],
      });

      // Retrieve current/old data for rollback purposes, in case the update fails.
      const previousEvent = queryClient.getQueryData(['events', { id }]);

      // Optimistically update cache data.
      queryClient.setQueryData(['events', { id }], newEvent);

      return {
        previousEvent,
      };
    },
    onError: (error, data, context) => {
      queryClient.setQueryData(['events', { id }], context.previousEvent);
    },
    onSettled: () => {
      // Invalidate cache to keep sync between backend and cache data.
      queryClient.invalidateQueries(['events', { id }]);
    },
  });

  function handleSubmit(formData) {
    mutate({ id, event: formData });
    navigate('../');
  }

  function handleClose() {
    navigate('../');
  }

  let content;

  if (isPending) {
    content = (
      <div className='center'>
        <LoadingIndicator />
      </div>
    );
  }

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
        <Link to='../' className='button-text'>
          Cancel
        </Link>
        <button type='submit' className='button'>
          Update
        </button>
      </EventForm>
    );
  }

  return <Modal onClose={handleClose}>{content}</Modal>;
}
