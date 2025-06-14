import type { PropsWithChildren } from 'react';

import './PlaceList.css';
import Card from '../../shared/components/UIElements/Card';
import PlaceItem from './PlaceItem';
import type { Place } from '../../models/place';

interface Props extends PropsWithChildren {
  items: Place[];
}

const PlaceList: React.FC<Props> = ({ items }) => {
  if (items.length === 0) {
    return (
      <div className='place-list center'>
        <Card>
          <h2>No places found.</h2>
          <button>Share Place</button>
        </Card>
      </div>
    );
  }

  return (
    <ul className='place-list'>
      {items.map((place) => (
        <PlaceItem
          key={place.id}
          id={place.id}
          image={place.image}
          title={place.title}
          description={place.description}
          address={place.address}
          creator={place.creator}
          location={place.location}
        />
      ))}
    </ul>
  );
};

export default PlaceList;
