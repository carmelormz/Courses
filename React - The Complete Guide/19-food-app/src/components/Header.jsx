import { useContext } from 'react';
import logoImg from '../assets/logo.jpg';
import Button from './UI/Button';
import CartContext from '../store/CartContext';

export default function Header() {
  const { items } = useContext(CartContext);

  const cartCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <header id='main-header'>
      <div id='title'>
        <img src={logoImg} alt='restaurant logo image' />
        <h1>FoodApp</h1>
      </div>
      <nav>
        <Button textOnly>Cart ({cartCount})</Button>
      </nav>
    </header>
  );
}
