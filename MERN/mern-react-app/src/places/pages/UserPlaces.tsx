import PlaceList from '../components/PlaceList';
import type { Place } from '../../models/place';
import { useParams } from 'react-router-dom';

const DUMMY_PLACES_: Place[] = [
  {
    id: 'p1',
    title: 'Empire State Building',
    description: 'One of the most famouse skyscrappers in the world',
    image:
      'https://media.architecturaldigest.com/photos/66b3974338264b1c676c46d3/1:1/w_3840,h_3840,c_limit/GettyImages-584714362.jpg',
    address: '20 W 34th St., New York, NY 10001',
    location: {
      lat: 40.7484553,
      lng: -74.0041184,
    },
    creator: 'u1',
  },
  {
    id: 'p2',
    title: 'Empire State Building',
    description: 'One of the most famouse skyscrappers in the world',
    image:
      'https://media.architecturaldigest.com/photos/66b3974338264b1c676c46d3/1:1/w_3840,h_3840,c_limit/GettyImages-584714362.jpg',
    address: '20 W 34th St., New York, NY 10001',
    location: {
      lat: 40.7484553,
      lng: -74.0041184,
    },
    creator: 'u2',
  },
];

const UserPlaces: React.FC = () => {
  const { uid } = useParams();

  const filteredPlacesByUser = DUMMY_PLACES_.filter(
    (place) => place.creator === uid
  );

  return <PlaceList items={filteredPlacesByUser} />;
};

export default UserPlaces;
