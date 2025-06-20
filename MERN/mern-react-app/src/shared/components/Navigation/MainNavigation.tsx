import { Link } from 'react-router-dom';
import MainHeader from './MainHeader';

import './MainNavigation.css';
import NavLinks from './NavLinks';
import SideDrawer from './SideDrawer';
import { useState } from 'react';
import Backdrop from '../UIElements/Backdrop';

const MainNavigation: React.FC = () => {
  const [drawerIsOpen, setDrawerIsOpen] = useState<boolean>(false);

  const openDrawer = () => {
    setDrawerIsOpen(true);
  };

  const closeDrawer = () => {
    setDrawerIsOpen(false);
  };

  return (
    <>
      {drawerIsOpen && (
        <>
          <Backdrop onClick={closeDrawer} />
          <SideDrawer onClick={closeDrawer}>
            <nav className='main-navigation__drawer-nav'>
              <NavLinks />
            </nav>
          </SideDrawer>
        </>
      )}
      <MainHeader>
        <button className='main-navigation__menu-btn' onClick={openDrawer}>
          <span />
          <span />
          <span />
        </button>
        <h1 className='main-navigation__title'>
          <Link to='/'>YourPlaces</Link>
        </h1>
        <nav className='main-navigation__header-nav'>
          <NavLinks />
        </nav>
      </MainHeader>
    </>
  );
};

export default MainNavigation;
