import { forwardRef, useImperativeHandle, useRef } from 'react';

export const ResultModal = forwardRef(({ result, targetTime }, ref) => {
  const dialogRef = useRef();

  // Exposes internal methods and properties to outside components.
  // Requires a forwarded ref (which is the one in which the method
  // will be called.)
  useImperativeHandle(ref, () => {
    return {
      open: () => {
        dialogRef.current.showModal();
      },
    };
  });

  return (
    <dialog ref={dialogRef} className='result-modal'>
      <h2>You {result}!</h2>
      <p>
        The target time was <strong>{targetTime} seconds</strong>.
      </p>
      <p>
        You stopped the timer with <strong>X seconds left</strong>.
      </p>
      <form action='dialog'>
        <button>Close</button>
      </form>
    </dialog>
  );
});
