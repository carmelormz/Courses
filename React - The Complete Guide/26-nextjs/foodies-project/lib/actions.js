'use server';

import { redirect } from 'next/navigation';
import { saveMeal } from './meals';
import { revalidatePath } from 'next/cache';

function isInvalidValue(text) {
  return !text || text.trim() === '';
}

export async function shareMeal(prevState, formData) {
  const meal = {
    title: formData.get('title'),
    summary: formData.get('summary'),
    instructions: formData.get('instructions'),
    image: formData.get('image'),
    creator: formData.get('name'),
    creator_email: formData.get('email'),
  };

  if (
    isInvalidValue(meal.title) ||
    isInvalidValue(meal.summary) ||
    isInvalidValue(meal.instructions) ||
    isInvalidValue(meal.creator) ||
    isInvalidValue(meal.creator_email) ||
    !meal.creator_email.includes('@') ||
    !meal.image ||
    meal.image.size === 0
  ) {
    return {
      message: 'Invalid input',
    };
  }

  await saveMeal(meal);

  // Invalidate cache of '/meals' page to show the newest data.
  // Can include a second parameter to invalidate all children/nested pages in a path. (ie. 'layout')
  revalidatePath('/meals');

  redirect('/meals');
}
