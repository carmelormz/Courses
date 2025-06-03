'use client';

export default function Error({ error }) {
  return (
    <main className='error'>
      <h1>An error ocurred!</h1>
      <p>Failed to fetch data from database. Please try again later.</p>
    </main>
  );
}
