import type { PropsWithChildren } from 'react';

import type { Place } from '../../models/place';
import Card from '../../shared/components/UIElements/Card';

import './PlaceItem.css';

interface Props extends PropsWithChildren, Place {}

const PlaceItem: React.FC<Props> = ({ image, title, address, description }) => {
  return (
    <li className='place-item'>
      <Card className='place-item__content'>
        <div className='place-item__image'>
          <img src={image} alt={title} />
        </div>
        <div className='place-item__info'>
          <h2>{title}</h2>
          <h2>{address}</h2>
          <p>{description}</p>
        </div>
        <div className='place-item__actions'>
          <button>View On Map</button>
          <button>Edit</button>
          <button>Delete</button>
        </div>
      </Card>
    </li>
  );
};

export default PlaceItem;
