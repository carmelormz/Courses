import { useState, type PropsWithChildren } from 'react';

import type { Place } from '../../models/place';
import Card from '../../shared/components/UIElements/Card';

import './PlaceItem.css';
import Button from '../../shared/components/FormElements/Button';
import Modal from '../../shared/components/UIElements/Modal';
import { AnimatePresence } from 'framer-motion';
import Map from '../../shared/components/UIElements/Map';

interface Props extends PropsWithChildren, Place {}

const PlaceItem: React.FC<Props> = ({
  id,
  image,
  title,
  address,
  description,
  location,
}) => {
  const [showMap, setShowMap] = useState<boolean>(false);

  const openMapHandler = () => {
    setShowMap(true);
  };

  const closeMapHandler = () => {
    setShowMap(false);
  };

  const modalFooter = <Button onClick={closeMapHandler}>Close</Button>;

  return (
    <>
      <AnimatePresence>
        <Modal
          show={showMap}
          onCancel={closeMapHandler}
          header={address}
          contentClass='place-item__modal-content'
          footerClass='place-item__modal-actions'
          footer={modalFooter}
        >
          <div className='map-container'>
            <Map center={location} zoom={16} />
          </div>
        </Modal>
      </AnimatePresence>
      <li className='place-item'>
        <Card className='place-item__content'>
          <div className='place-item__image'>
            <img src={image} alt={title} />
          </div>
          <div className='place-item__info'>
            <h2>{title}</h2>
            <h2>{address}</h2>
            <p>{description}</p>
          </div>
          <div className='place-item__actions'>
            <Button inverse onClick={openMapHandler}>
              View On Map
            </Button>
            <Button to={`/places/${id}`}>Edit</Button>
            <Button danger>Delete</Button>
          </div>
        </Card>
      </li>
    </>
  );
};

export default PlaceItem;
