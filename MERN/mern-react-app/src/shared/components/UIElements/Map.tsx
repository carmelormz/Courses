import {
  useEffect,
  useRef,
  type CSSProperties,
  type PropsWithChildren,
} from 'react';
import './Map.css';

interface Props extends PropsWithChildren {
  className?: string;
  style?: CSSProperties;
  center?: google.maps.LatLngLiteral;
  zoom?: number;
}

const Map: React.FC<Props> = ({ className, style, center, zoom }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initMap = async () => {
      const { Map } = (await google.maps.importLibrary(
        'maps'
      )) as google.maps.MapsLibrary;
      const { AdvancedMarkerElement } = (await google.maps.importLibrary(
        'marker'
      )) as google.maps.MarkerLibrary;
      const map = new Map(containerRef.current as HTMLElement, {
        center,
        zoom,
        mapId: 'MAP_TEST_ID',
      });
      new AdvancedMarkerElement({ position: center, map });
    };

    initMap();
  }, [center, zoom]);

  return (
    <div className={`map ${className}`} style={style} ref={containerRef}></div>
  );
};

export default Map;
