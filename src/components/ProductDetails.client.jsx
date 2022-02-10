import {Product, flattenConnection, useProduct} from '@shopify/hydrogen/client';

import ProductOptions from './ProductOptions.client';
import Gallery from './Gallery.client';
import Seo from './Seo.client';
import {
  BUTTON_PRIMARY_CLASSES,
  BUTTON_SECONDARY_CLASSES,
} from './Button.client';
import {useState} from 'react';
import Minus from './icons/Minus';
import Plus from './icons/Plus';

/**
 * A client component that displays detailed information about a product to allow buyers to make informed decisions
 */
function ProductPriceMarkup() {
  return (
    <div className="flex md:flex-col items-end font-semibold  md:items-start ">
      <Product.SelectedVariant.Price
        priceType="compareAt"
        className="text-gray-500 line-through  mr-2.5"
      >
        {({amount, currencyNarrowSymbol}) => `${currencyNarrowSymbol}${amount}`}
      </Product.SelectedVariant.Price>
      <Product.SelectedVariant.Price className="text-gray-900">
        {({currencyCode, amount, currencyNarrowSymbol}) =>
          `${currencyNarrowSymbol}${amount} ${currencyCode}`
        }
      </Product.SelectedVariant.Price>
      <Product.SelectedVariant.UnitPrice className="text-gray-500">
        {({currencyCode, amount, currencyNarrowSymbol, referenceUnit}) =>
          ` ${currencyNarrowSymbol}${amount} ${currencyCode}/${referenceUnit}`
        }
      </Product.SelectedVariant.UnitPrice>
    </div>
  );
}

function AddToCartMarkup() {
  const {selectedVariant} = useProduct();
  const isOutOfStock = !selectedVariant.availableForSale;

  return (
    <div className="space-y-2 mb-8 text-md">
      <Product.SelectedVariant.AddToCartButton
        className={`${BUTTON_PRIMARY_CLASSES} py-3 rounded-lg`}
        disabled={isOutOfStock}
      >
        {isOutOfStock ? 'Out of stock' : 'Add to bag'}
      </Product.SelectedVariant.AddToCartButton>
      {isOutOfStock ? (
        <p className="text-black text-center">Available in 2-3 weeks</p>
      ) : (
        <Product.SelectedVariant.BuyNowButton
          className={`${BUTTON_SECONDARY_CLASSES} py-3 rounded-lg`}
        >
          Buy it now
        </Product.SelectedVariant.BuyNowButton>
      )}
    </div>
  );
}

function SizeChart() {
  return (
    <>
      <h3
        className="text-xl text-black font-semibold mt-8 mb-4"
        id="size-chart"
      >
        Size Chart
      </h3>
      <table className="min-w-full table-fixed  text-center bg-white">
        <thead>
          <tr className="bg-black text-white">
            <th className="w-1/4 py-2 px-4 font-normal">Board Size</th>
            <th className="w-1/4 py-2 px-4 font-normal">154</th>
            <th className="w-1/4 py-2 px-4 font-normal">158</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="p-3 border border-black">Weight Range</td>
            <td className="p-3 border border-black">120-180 lbs. /54-82kg</td>
            <td className="p-3 border border-black">150-200 lbs. /68-91 kg</td>
          </tr>
          <tr>
            <td className="p-3 border border-black">Waist Width</td>
            <td className="p-3 border border-black">246mm</td>
            <td className="p-3 border border-black">255mm</td>
          </tr>
          <tr>
            <td className="p-3 border border-black">Stance Width</td>
            <td className="p-3 border border-black">-40</td>
            <td className="p-3 border border-black">-40</td>
          </tr>
          <tr>
            <td className="p-3 border border-black">Binding Sizes</td>
            <td className="p-3 border border-black">
              Men&rsquo;s S/M, Women&rsquo;s S/M
            </td>
            <td className="p-3 border border-black">
              Men&rsquo;s L, Women&rsquo;s L
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default function ProductDetails({product}) {
  const initialVariant = flattenConnection(product.variants)[0];
  const [activeTab, setActiveTab] = useState(0);
  const tabs = getTabs();
  return (
    <>
      <Seo product={product} />
      <Product product={product} initialVariantId={initialVariant.id}>
        <div className="grid grid-cols-1 gap-x-0 md:grid-cols-[1fr,1fr] ">
          <div className="md:hidden mt-5 mb-8">
            <Product.Title
              as="h1"
              className="text-4xl font-bold text-black mb-4"
            />
            {product.vendor && (
              <div className=" font-medium mb-2 text-gray-900">
                {product.vendor}
              </div>
            )}
            <span />
            <div className="flex justify-between md:block">
              <ProductPriceMarkup />
            </div>
          </div>

          <Gallery />

          <div className="ml-6">
            <div className={'pt-28  md:max-w-lg'}>
              <div className="hidden md:block uppercase">
                {product.vendor && (
                  <div className="text-2xl tracking-widest font-medium mb-2 text-gray-900">
                    {product.vendor}
                  </div>
                )}
                <div className={'flex justify-between items-center'}>
                  <Product.Title
                    as="h1"
                    className=" font-semibold pt-3 text-black mb-4"
                  />

                  <ProductPriceMarkup />
                </div>
              </div>
              {/* Product Options */}
              <div className="mt-10 mb-2">
                <ProductOptions />
                <Product.Metafield namespace="my_fields" keyName="size_chart">
                  {({value}) => {
                    return value ? (
                      <a
                        href="#size-chart"
                        className="block underline text-gray-500  tracking-wide my-4"
                      >
                        Size Chart
                      </a>
                    ) : null;
                  }}
                </Product.Metafield>
                <AddToCartMarkup />
                <div className="flex items space-x-4">
                  <Product.Metafield
                    namespace="my_fields"
                    keyName="sustainable"
                  >
                    {({value}) => {
                      return value ? (
                        <span className="flex items-center mb-8">
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="stroke-current text-blue-600 mr-3"
                          >
                            <path
                              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364-.7071-.7071M6.34315 6.34315l-.70711-.70711m12.72796.00005-.7071.70711M6.3432 17.6569l-.70711.7071M16 12c0 2.2091-1.7909 4-4 4-2.20914 0-4-1.7909-4-4 0-2.20914 1.79086-4 4-4 2.2091 0 4 1.79086 4 4Z"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <span className=" text-gray-900 font-medium">
                            Sustainable Material
                          </span>
                        </span>
                      ) : null;
                    }}
                  </Product.Metafield>
                  <Product.Metafield
                    namespace="my_fields"
                    keyName="lifetime_warranty"
                  >
                    {({value}) => {
                      return value ? (
                        <span className="flex items-center mb-8">
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="stroke-current text-blue-600 mr-3"
                          >
                            <path
                              d="M9 12L11 14L15 10M20.6179 5.98434C20.4132 5.99472 20.2072 5.99997 20 5.99997C16.9265 5.99997 14.123 4.84453 11.9999 2.94434C9.87691 4.84446 7.07339 5.99985 4 5.99985C3.79277 5.99985 3.58678 5.9946 3.38213 5.98422C3.1327 6.94783 3 7.95842 3 9.00001C3 14.5915 6.82432 19.2898 12 20.622C17.1757 19.2898 21 14.5915 21 9.00001C21 7.95847 20.8673 6.94791 20.6179 5.98434Z"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <span className=" text-gray-900 font-medium">
                            Lifetime Warranty
                          </span>
                        </span>
                      ) : null;
                    }}
                  </Product.Metafield>
                </div>
              </div>
              {/* Product Description */}
              <div className={'accordion pt-6'}>
                <div className={'tab'}>
                  {tabs.map((item, i) => {
                    return (
                      <div
                        className={`tabs ${
                          activeTab == i ? 'open-tab' : 'closed-tab'
                        }`}
                        key={i}
                      >
                        <div
                          role="button"
                          onClick={() => {
                            if (activeTab === i) {
                              setActiveTab(null);
                            } else {
                              setActiveTab(i);
                            }
                          }}
                          className={
                            'flex cursor-pointer justify-between tab-label'
                          }
                        >
                          <h3 className={' uppercase'}>{item.label}</h3>
                          <span>{activeTab === i ? <Minus /> : <Plus />}</span>
                        </div>

                        <div className={'tab-content '}>{item.component}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <Product.Metafield namespace="my_fields" keyName="size_chart">
                {({value}) => {
                  return value ? (
                    <div className="border-t border-gray-200">
                      <SizeChart />
                    </div>
                  ) : null;
                }}
              </Product.Metafield>
            </div>
          </div>
        </div>
      </Product>
    </>
  );
}

function getTabs() {
  let tabs = [];
  tabs[0] = {
    label: 'Description',
    component: <Product.Description className=" pt-4 text-black text-md" />,
  };
  return tabs;
}
