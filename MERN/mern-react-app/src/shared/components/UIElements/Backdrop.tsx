import type { PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';

import './Backdrop.css';

interface Props extends PropsWithChildren {
  onClick: () => void;
}

const Backdrop: React.FC<Props> = ({ onClick }) => {
  const portalEl = document.getElementById('backdrop-hook');
  const content = <div className='backdrop' onClick={onClick}></div>;
  return portalEl ? createPortal(content, portalEl) : null;
};

export default Backdrop;
