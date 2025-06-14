import type { CSSProperties, PropsWithChildren } from 'react';

import './Avatar.css';

interface Props extends PropsWithChildren {
  className?: string;
  style?: CSSProperties;
  width?: number;
  image: string;
  alt: string;
}

const Avatar: React.FC<Props> = ({ className, style, width, image, alt }) => {
  return (
    <div className={`avatar ${className}`} style={style}>
      <img src={image} alt={alt} style={{ width, height: width }} />
    </div>
  );
};

export default Avatar;
