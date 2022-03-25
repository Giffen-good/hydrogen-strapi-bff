import {Image, Link} from '@shopify/hydrogen';

import MoneyCompareAtPrice from './MoneyCompareAtPrice.client';
import MoneyPrice from './MoneyPrice.client';

/**
 * A shared component that displays a single product to allow buyers to quickly identify a particular item of interest
 */
export default function ProductCard({product}) {
  const selectedVariant = product.variants.edges[0].node;

  if (selectedVariant == null) {
    return null;
  }

  return (
    <div className="text-md mb-4 relative uppercase text-sm">
      <Link to={`/products/${product.handle}`}>
        <div
          className="mb-2 relative flex items-center justify-center overflow-hidden object-cover
          max-h-[30rem] md:h-[36vw]

        h-[56vw]"
        >
          {selectedVariant.image ? (
            <Image
              className="bg-white absolute w-full h-full transition-all duration-500 ease-in-out transform bg-center bg-cover object-center object-cover"
              image={selectedVariant.image}
            />
          ) : null}
        </div>

        <div className={'flex justify-between'}>
          <span className="text-black  mb-0.5">{product.title}</span>
          <div className="flex ">
            <SetPrice selectedVariant={selectedVariant} />
          </div>
        </div>

        {product.vendor && (
          <p className="text-gray-900 font-semibold font-medium text-sm mb-0.5">
            {product.vendor}
          </p>
        )}
      </Link>
    </div>
  );
}
function SetPrice({selectedVariant}) {
  if (!selectedVariant?.availableForSale) {
    return <div className={'uppercase text-sm line-through'}>Sold Out</div>;
  } else {
    return (
      <>
        {selectedVariant.compareAtPriceV2 && (
          <MoneyCompareAtPrice money={selectedVariant.compareAtPriceV2} />
        )}
        <MoneyPrice money={selectedVariant.priceV2} />
      </>
    );
  }
}
function stripTrailingZeroes(selectedVariant) {
  const splitPrice = selectedVariant.priceV2.amount.split('.');
  const compareAt = selectedVariant.compareAtPriceV2;
  if (splitPrice[1] == '0') selectedVariant.priceV2.amount = splitPrice[0]
  if (compareAt && compareAt.amount.split('.')[1] == '0') selectedVariant.compareAtPriceV2 = compareAt.amount.split('.')[0];
}