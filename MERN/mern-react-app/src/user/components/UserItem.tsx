import type { PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';

import type { User } from '../../models/user';
import Card from '../../shared/components/UIElements/Card';
import Avatar from '../../shared/components/UIElements/Avatar';

import './UserItem.css';

interface Props extends PropsWithChildren, User {}

const UserItem: React.FC<Props> = ({ id, name, image, places: placeCount }) => {
  return (
    <li className='user-item'>
      <Card className='user-item__content'>
        <Link to={`/${id}/places`}>
          <div className='user-item__image'>
            <Avatar image={image} alt={name} />
          </div>
          <div className='user-item__info'>
            <h2>{name}</h2>
            <h3>
              {placeCount} {placeCount === 1 ? 'Place' : 'Places'}
            </h3>
          </div>
        </Link>
      </Card>
    </li>
  );
};

export default UserItem;
