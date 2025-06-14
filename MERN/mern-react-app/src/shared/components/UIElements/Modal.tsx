import type {
  CSSProperties,
  FormEvent,
  PropsWithChildren,
  ReactNode,
} from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';

import Backdrop from './Backdrop';

import './Modal.css';

interface OverlayProps extends PropsWithChildren {
  className?: string;
  style?: CSSProperties;
  header: string;
  headerClass?: string;
  onSubmit?: (e: FormEvent) => void;
  contentClass?: string;
  footerClass?: string;
  footer?: ReactNode;
}

interface ModalProps extends PropsWithChildren, OverlayProps {
  show?: boolean;
  onCancel?: () => void;
}

/** Internal Component */
const ModalOverlay: React.FC<OverlayProps> = ({
  className,
  style,
  header,
  headerClass,
  onSubmit,
  contentClass,
  children,
  footerClass,
  footer,
}) => {
  return (
    <div className={`modal ${className}`} style={style}>
      <header className={`modal__header ${headerClass}`}>
        <h2>{header}</h2>
      </header>
      <form
        onSubmit={onSubmit ? onSubmit : (e: FormEvent) => e.preventDefault()}
      >
        <div className={`modal__content ${contentClass}`}>{children}</div>
        <footer className={`modal__footer ${footerClass}`}>{footer}</footer>
      </form>
    </div>
  );
};

const Modal: React.FC<ModalProps> = ({ show, onCancel, ...rest }) => {
  const portalEl = document.getElementById('modal-hook');
  const content = (
    <>
      {show && <Backdrop onClick={onCancel ? onCancel : () => {}} />}
      {show && (
        <motion.dialog
          open
          variants={{
            hidden: {
              y: 30,
              opacity: 1,
            },
            visible: {
              y: 0,
              opacity: 1,
            },
          }}
          initial='hidden'
          animate='visible'
          exit='hidden'
          transition={{ duration: 0.2 }}
        >
          <ModalOverlay {...rest} />
        </motion.dialog>
      )}
    </>
  );

  return portalEl ? createPortal(content, portalEl) : null;
};

export default Modal;
