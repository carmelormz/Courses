import type { CSSProperties, PropsWithChildren } from 'react';

import './Card.css';

interface Props extends PropsWithChildren {
  className?: string;
  style?: CSSProperties;
}

const Card: React.FC<Props> = ({ className, style, children }) => {
  return (
    <div className={`card ${className}`} style={style}>
      {children}
    </div>
  );
};

export default Card;
