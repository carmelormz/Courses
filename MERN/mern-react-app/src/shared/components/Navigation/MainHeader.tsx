import type { PropsWithChildren } from 'react';
import './MainHeader.css';

interface Props extends PropsWithChildren {}

const MainHeader: React.FC<Props> = ({ children }) => {
  return <header className='main-header'>{children}</header>;
};

export default MainHeader;
