import { useContext } from 'react';
import Modal from './UI/Modal';
import CartContext from '../store/CartContext';
import UserProgressContext from '../store/UserProgressContext';
import { currencyFormatter } from '../util/formatting';
import Input from './UI/Input';
import Button from './UI/Button';

export default function Checkout() {
  const { items } = useContext(CartContext);
  const { progress, hideCheckout } = useContext(UserProgressContext);

  const totalAmountDue = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleClose = () => {
    hideCheckout();
  };

  const isUserInCheckout = progress === 'CHECKOUT';

  return (
    <Modal
      open={isUserInCheckout}
      onClose={isUserInCheckout ? handleClose : null}
    >
      <form>
        <h2>Checkout</h2>
        <p>Total Amount: {currencyFormatter.format(totalAmountDue)}</p>
        <Input label='Full Name' type='text' id='full-name' />
        <Input label='Email Address' type='email' id='email' />
        <Input label='Street' type='text' id='street' />
        <div className='control-row'>
          <Input label='Postal Code' type='text' id='postal-code' />
          <Input label='City' type='text' id='city' />
        </div>

        <p className='modal-actions'>
          <Button textOnly type='button' onClick={handleClose}>
            Close
          </Button>
          <Button>Submit Order</Button>
        </p>
      </form>
    </Modal>
  );
}
