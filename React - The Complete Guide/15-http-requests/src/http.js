export const fetchAvailablePlaces = async () => {
  const response = await fetch('http://localhost:3000/places');
  const data = await response.json();

  if (!response.ok) {
    throw new Error('Failed to fetch available places');
  }

  return data.places;
};

export const fetchUserPlaces = async () => {
  const response = await fetch('http://localhost:3000/user-places');
  const data = await response.json();

  if (!response.ok) {
    throw new Error('Failed to fetch user selected places...');
  }

  return data.places;
};

export const updateUserPlaces = async (places) => {
  const response = await fetch('http://localhost:3000/user-places', {
    method: 'PUT',
    body: JSON.stringify({ places }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = response.json();

  if (!response.ok) {
    throw new Error('Failed to update user places data...');
  }

  return data.message;
};
