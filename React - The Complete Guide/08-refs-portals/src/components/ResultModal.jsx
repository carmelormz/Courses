import { forwardRef, useImperativeHandle, useRef } from 'react';
import { createPortal } from 'react-dom';

export const ResultModal = forwardRef(
  ({ result, targetTime, remainingTime, onReset }, ref) => {
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

    const userLost = remainingTime <= 0;
    const formattedRemainingTime = (remainingTime / 1000).toFixed(2);
    const score = Math.round((1 - remainingTime / (targetTime * 1000)) * 100);

    return createPortal(
      <dialog ref={dialogRef} className='result-modal' onClose={onReset}>
        {userLost && <h2>You Lost!</h2>}
        {!userLost && <h2>Your Score: {score}</h2>}
        <p>
          The target time was <strong>{targetTime} seconds</strong>.
        </p>
        <p>
          You stopped the timer with{' '}
          <strong>{formattedRemainingTime} seconds left</strong>.
        </p>
        <form action='dialog' onSubmit={onReset}>
          <button>Close</button>
        </form>
      </dialog>,
      document.getElementById('modal')
    );
  }
);
