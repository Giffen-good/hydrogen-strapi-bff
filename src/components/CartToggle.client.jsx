import {useCartUI} from './CartUIProvider.client';
import CartIconWithItems from './CartIconWithItems.client';

/**
 * A client component that defines the behavior when a user toggles a cart
 */
export default function CartToggle({handleClick, icon}) {
  const cartUI = useCartUI();

  if (cartUI == null) {
    throw new Error('CartToggle must be a descendent of a CartUIProvider');
  }

  const {isCartOpen, toggleCart} = cartUI;

  return (
    <button
      type="button"
      aria-expanded={isCartOpen}
      aria-controls="cart"
      onClick={() => {
        toggleCart();
        handleClick();
      }}
    >
      <CartIconWithItems icon={icon} />
      <span className="sr-only">Open cart</span>
    </button>
  );
}
