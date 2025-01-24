import { useContext } from 'react';
import Modal from './UI/Modal';
import CartContext from '../store/CartContext';
import UserProgressContext from '../store/UserProgressContext';
import { currencyFormatter } from '../util/formatting';
import Input from './UI/Input';
import Button from './UI/Button';
import useHttp from '../hooks/useHttp';
import Error from './Error';

const httpRequestConfig = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
};

export default function Checkout() {
  const { items, clearCart } = useContext(CartContext);
  const { progress, hideCheckout } = useContext(UserProgressContext);
  const { data, isLoading, error, sendRequest, clearData } = useHttp(
    'http://localhost:3000/orders',
    httpRequestConfig
  );

  const totalAmountDue = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleClose = () => {
    hideCheckout();
  };

  const handleFinish = () => {
    hideCheckout();
    clearCart();
    clearData();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const customerData = Object.fromEntries(formData.entries());

    sendRequest(
      JSON.stringify({
        order: {
          items,
          customer: customerData,
        },
      })
    );
  };

  const isUserInCheckout = progress === 'CHECKOUT';

  let actions = (
    <>
      <Button textOnly type='button' onClick={handleClose}>
        Close
      </Button>
      <Button>Submit Order</Button>
    </>
  );

  if (isLoading) {
    actions = <span>Sending order data...</span>;
  }

  if (data && !error) {
    return (
      <Modal open={isUserInCheckout} onClose={handleFinish}>
        <h2>Success</h2>
        <p>
          Your order was submitted successfully! We will get back to you with
          more detail by email between the next few minutes
        </p>
        <p className='modal-actions'>
          <Button onClick={handleFinish}>Okay</Button>
        </p>
      </Modal>
    );
  }

  return (
    <Modal
      open={isUserInCheckout}
      onClose={isUserInCheckout ? handleClose : null}
    >
      <form onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <p>Total Amount: {currencyFormatter.format(totalAmountDue)}</p>
        <Input label='Full Name' type='text' id='name' />
        <Input label='Email Address' type='email' id='email' />
        <Input label='Street' type='text' id='street' />
        <div className='control-row'>
          <Input label='Postal Code' type='text' id='postal-code' />
          <Input label='City' type='text' id='city' />
        </div>
        {error && <Error title='Failed to submit order' message={error} />}
        <p className='modal-actions'>{actions}</p>
      </form>
    </Modal>
  );
}
