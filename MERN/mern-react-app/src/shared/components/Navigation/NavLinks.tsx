import type { PropsWithChildren } from 'react';
import { NavLink } from 'react-router-dom';

import './NavLinks.css';

interface Props extends PropsWithChildren {}

const NavLinks: React.FC<Props> = () => {
  return (
    <ul className='nav-links'>
      <li>
        <NavLink to='/' end>
          All Users
        </NavLink>
      </li>
      <li>
        <NavLink to='/u1/places'>My Places</NavLink>
      </li>
      <li>
        <NavLink to='/places/new'>New Place</NavLink>
      </li>
      <li>
        <NavLink to='/auth'>Authenticate</NavLink>
      </li>
    </ul>
  );
};

export default NavLinks;
