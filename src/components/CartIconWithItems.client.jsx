import {useCartLinesTotalQuantity} from '@shopify/hydrogen/client';

/**
 * A client component that specifies the icon to use if a cart contains merchandise
 */
export default function CartIconWithItems() {
  const itemCount = useCartLinesTotalQuantity();

  return (
    <>
      <div className="relative">
        <h5 className={'inline-block font-semibold text-xs'}>
          <span>BAG</span>
          <div
            className={`inline-block pl-1  ${
              itemCount > 0 ? 'h-4 w-4' : 'h-0 w-0 overflow-hidden'
            }`}
            aria-hidden
          >
            ({itemCount > 0 ? itemCount : null})
          </div>
        </h5>
      </div>
      <span className="sr-only">Cart, {itemCount} items</span>
    </>
  );
}
