'use server';

import { redirect } from 'next/navigation';
import { saveMeal } from './meals';

function isInvalidValue(text) {
  return !text || text.trim() === '';
}

export async function shareMeal(formData) {
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
    throw new Error('Invalid input');
  }

  await saveMeal(meal);

  redirect('/meals');
}
