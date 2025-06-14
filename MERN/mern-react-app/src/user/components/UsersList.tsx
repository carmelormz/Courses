import type { PropsWithChildren } from 'react';

import UserItem from './UserItem';
import type { User } from '../../models/user';
import Card from '../../shared/components/UIElements/Card';

import './UsersList.css';

interface Props extends PropsWithChildren {
  items: User[];
}

const UsersList: React.FC<Props> = ({ items }) => {
  if (items.length === 0) {
    return (
      <div className='center'>
        <Card>
          <h2>No users found.</h2>
        </Card>
      </div>
    );
  }

  return (
    <ul className='users-list'>
      {items.map((user) => (
        <UserItem
          key={user.id}
          id={user.id}
          image={user.image}
          name={user.name}
          places={user.places}
        />
      ))}
    </ul>
  );
};

export default UsersList;
