import classes from './CartButton.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { toggleCart } from '../../store/slices/uiSlice';
const CartButton = (props) => {
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const dispatch = useDispatch();

  const handleCartClick = () => {
    dispatch(toggleCart());
  };

  return (
    <button className={classes.button} onClick={handleCartClick}>
      <span>My Cart</span>
      <span className={classes.badge}>{totalQuantity}</span>
    </button>
  );
};

export default CartButton;
