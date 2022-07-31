import {useMoney} from '@shopify/hydrogen';

/**
 * A client component that renders a product's compare at price
 */
export default function MoneyCompareAtPrice({money}) {
  const {currencyCode, withoutTrailingZeros} = useMoney(money);
  return (
    <span className="line-through mr-2.5 text-gray-500 whitespace-nowrap">
      {withoutTrailingZeros}{' '}{currencyCode}
    </span>
  );
}
