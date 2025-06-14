import type { User } from '../../models/user';
import UsersList from '../components/UsersList';

const Users: React.FC = () => {
  const USERS: User[] = [
    {
      id: 'u1',
      name: 'Test User 1',
      image:
        'https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg',
      places: 3,
    },
    {
      id: 'u2',
      name: 'Test User 2',
      image:
        'https://media.istockphoto.com/id/1437816897/photo/business-woman-manager-or-human-resources-portrait-for-career-success-company-we-are-hiring.jpg?s=612x612&w=0&k=20&c=tyLvtzutRh22j9GqSGI33Z4HpIwv9vL_MZw_xOE19NQ=',
      places: 2,
    },
  ];

  return <UsersList items={USERS} />;
};

export default Users;
