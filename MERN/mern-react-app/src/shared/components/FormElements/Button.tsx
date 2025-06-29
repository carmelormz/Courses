import type { PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';

import './Button.css';

interface Props extends PropsWithChildren {
  href?: string;
  size?: string;
  inverse?: boolean;
  danger?: boolean;
  to?: string;
  exact?: boolean;
  type?: 'submit' | 'reset' | 'button';
  onClick?: () => void;
  disabled?: boolean;
}

const Button: React.FC<Props> = ({
  href,
  size,
  inverse,
  danger,
  to,
  type = 'button',
  onClick,
  disabled,
  children,
}) => {
  if (href) {
    return (
      <a
        className={`button button--${size || 'default'} ${
          inverse && 'button--inverse'
        } ${danger && 'button--danger'}`}
        href={href}
      >
        {children}
      </a>
    );
  }

  if (to) {
    return (
      <Link
        to={to}
        className={`button button--${size || 'default'} ${
          inverse && 'button--inverse'
        } ${danger && 'button--danger'}`}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      className={`button button--${size || 'default'} ${
        inverse && 'button--inverse'
      } ${danger && 'button--danger'}`}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
