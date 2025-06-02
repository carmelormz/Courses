import Link from 'next/link';

export default function MealsPage() {
  return (
    <main>
      <h1>Meals Page</h1>
      <p>
        <Link href='/meals/test-1'>Test 1</Link>
      </p>
      <p>
        <Link href='/meals/test-2'>Test 2</Link>
      </p>
    </main>
  );
}
