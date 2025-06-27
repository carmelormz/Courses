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
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

  const openMapHandler = () => {
    setShowMap(true);
  };

  const closeMapHandler = () => {
    setShowMap(false);
  };

  const openDeleteModalHandler = () => {
    setShowDeleteModal(true);
  };

  const cancelDeleteModalHandler = () => {
    setShowDeleteModal(false);
  };

  const confirmDeleteHandler = () => {
    setShowDeleteModal(false);
    console.log('Deleting...');
  };

  const mapModalFooter = <Button onClick={closeMapHandler}>Close</Button>;

  const deleteModalFooter = (
    <>
      <Button inverse onClick={cancelDeleteModalHandler}>
        Cancel
      </Button>
      <Button danger onClick={confirmDeleteHandler}>
        Delete
      </Button>
    </>
  );

  return (
    <>
      <AnimatePresence>
        <Modal
          show={showMap}
          onCancel={closeMapHandler}
          header={address}
          contentClass='place-item__modal-content'
          footerClass='place-item__modal-actions'
          footer={mapModalFooter}
        >
          <div className='map-container'>
            <Map center={location} zoom={16} />
          </div>
        </Modal>
      </AnimatePresence>
      <AnimatePresence>
        <Modal
          show={showDeleteModal}
          onCancel={cancelDeleteModalHandler}
          header='Are you sure?'
          footerClass='place-item__modal_actions'
          footer={deleteModalFooter}
        >
          <p>
            Do you want to proceed and delete this place? Please not that it
            can't be undone.
          </p>
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
            <Button danger onClick={openDeleteModalHandler}>
              Delete
            </Button>
          </div>
        </Card>
      </li>
    </>
  );
};

export default PlaceItem;
