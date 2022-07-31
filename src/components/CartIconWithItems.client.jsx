import {useCart} from '@shopify/hydrogen';
import StrapiMedia from "./StrapiMedia.client";
import CartIcon from './CartIcon';

/**
 * A client component that specifies the icon to use if a cart contains merchandise
 */
export default function CartIconWithItems({icon}) {
  const {totalQuantity} = useCart();

  return (
    <>
      <div className="relative">
        { icon ? (
          <StrapiMedia media={icon} classes={'mx-auto w-9 h-9'} />
        ) : <CartIcon /> }


        <div
          className={`shopping-badge text-xs rounded-full leading-none text-white absolute bottom-1.5 right-0 flex items-center justify-center transform translate-y-1/2 transition-all ${
            totalQuantity > 0 ? 'h-4 w-4' : 'h-0 w-0 overflow-hidden'
          }`}
          aria-hidden
        >
          {totalQuantity > 0 ? totalQuantity : null}
        </div>
      </div>
      <span className="sr-only">Cart, {totalQuantity} items</span>
    </>
  );
}
