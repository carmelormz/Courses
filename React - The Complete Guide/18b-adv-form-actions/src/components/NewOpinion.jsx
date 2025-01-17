import { useActionState } from 'react';

export function NewOpinion() {
  const submitAction = (prevFormActionState, formData) => {
    const userName = formData.get('userName');
    const title = formData.get('title');
    const body = formData.get('body');

    const errors = [];

    if (userName.trim().length === 0) {
      errors.push('Please provide a username.');
    }

    if (title.trim().length === 0) {
      errors.push('Please provide a title.');
    }

    if (body.trim().length === 0) {
      errors.push('Opinion body cannot be empty.');
    }

    if (errors.length > 0) {
      return {
        errors,
        values: {
          userName,
          title,
          body,
        },
      };
    }

    return { errors: null };
  };

  const [formState, formActionFn] = useActionState(submitAction, {
    errors: null,
  });

  return (
    <div id='new-opinion'>
      <h2>Share your opinion!</h2>
      <form action={formActionFn}>
        <div className='control-row'>
          <p className='control'>
            <label htmlFor='userName'>Your Name</label>
            <input
              type='text'
              id='userName'
              name='userName'
              defaultValue={formState.values?.userName}
            />
          </p>

          <p className='control'>
            <label htmlFor='title'>Title</label>
            <input
              type='text'
              id='title'
              name='title'
              defaultValue={formState.values?.title}
            />
          </p>
        </div>
        <p className='control'>
          <label htmlFor='body'>Your Opinion</label>
          <textarea
            id='body'
            name='body'
            rows={5}
            defaultValue={formState.values?.body}
          ></textarea>
        </p>

        {formState.errors && (
          <ul className='errors'>
            {formState.errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        )}

        <p className='actions'>
          <button type='submit'>Submit</button>
        </p>
      </form>
    </div>
  );
}
