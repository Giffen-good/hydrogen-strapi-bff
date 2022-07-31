import {Image, Link} from '@shopify/hydrogen';

import FreeLink from './StrapiHelpers/FreeLink';
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
  const url = `/products/${product.handle}`;
  return (
    <div className="text-md mb-4 relative uppercase text-sm">
      <FreeLink url={url}>
        <div
          className="mb-2 relative flex items-center justify-center overflow-hidden object-cover
          max-h-[30rem] md:h-[36vw]

        h-[56vw]"
        >
          {selectedVariant.image ? (
            <Image
              className="bg-white absolute w-full h-full transition-all duration-500 ease-in-out transform bg-center bg-cover object-center object-cover"
              data={selectedVariant.image}
              options={{
                height: '900',
                crop: 'center',
              }}
            />
          ) : null}
        </div>

        <div className={'flex justify-between flex-wrap sm:flex-nowrap '}>
          <span className="text-black  mb-0.5">{product.title}</span>
          <div className="flex sm:pt-0 pt-4 sm:w-auto w-full">
            <SetPrice selectedVariant={selectedVariant} />
          </div>
        </div>

        {product.vendor && (
          <p className="text-gray-900 font-semibold  text-sm mb-0.5">
            {product.vendor}
          </p>
        )}
      </FreeLink>
    </div>
  );
}
function SetPrice({selectedVariant}) {
  if (!selectedVariant?.availableForSale) {
    return <div className={'uppercase flex-shrink-0 text-sm line-through'}>Sold Out</div>;
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
