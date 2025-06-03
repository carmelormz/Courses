'use client';

export default function Error({ error }) {
  return (
    <main className='error'>
      <h1>An error ocurred!</h1>
      <p>Failed to create meal. Please verify values and try again.</p>
    </main>
  );
}
