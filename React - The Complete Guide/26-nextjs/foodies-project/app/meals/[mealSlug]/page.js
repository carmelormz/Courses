export default async function MealDetailsPage({ params }) {
  const { mealSlug } = await params;
  return (
    <main>
      <h1>Meals Details</h1>
      <p>{mealSlug}</p>
    </main>
  );
}
