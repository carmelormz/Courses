export default function MealDetailsPage({ params }) {
  const { mealSlug } = params;
  return (
    <main>
      <h1>Meals Details</h1>
      <p>{mealSlug}</p>
    </main>
  );
}
