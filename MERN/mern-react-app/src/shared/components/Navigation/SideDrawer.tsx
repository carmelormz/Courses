import type { PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';

import './SideDrawer.css';

interface Props extends PropsWithChildren {
  show?: boolean;
  onClick: () => void;
}

const SideDrawer: React.FC<Props> = ({ onClick, children }) => {
  const portalEl = document.getElementById('drawer-hook');
  const content = (
    <motion.aside
      className='side-drawer'
      variants={{
        hidden: {
          x: -100,
        },
        visible: {
          x: 0,
          transition: { duration: 0.2 },
        },
      }}
      initial='hidden'
      animate='visible'
      onClick={onClick}
    >
      {children}
    </motion.aside>
  );

  return portalEl ? createPortal(content, portalEl) : null;
};

export default SideDrawer;
