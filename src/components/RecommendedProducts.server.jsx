import {
  flattenConnection,
  useShop,
  useSession,
  useShopQuery,
  gql
} from '@shopify/hydrogen';

import {Suspense} from 'react';
import ProductCard from './ProductCard';
import CollectionWrapperServer from './CollectionWrapper.server';
export default function RecommendedProductsServer() {

  const {countryCode = 'US'} = useSession();
  const {languageCode} = useShop();
  const {data} = useShopQuery({
    query: QUERY,
    variables: {
      countryCode,
      language: languageCode,
    },
  });
  const products = data ? flattenConnection(data.products) : [];
  console.log(products)
  return (
    <Suspense fallback={null}>
      <div className="mb-10 lg:mt-20 md:mt-14">
        <p className="mb-8 text-2xl text-center  text-black font-serif font-medium ">
          You might also like:
        </p>
        <CollectionWrapperServer>
          {products.map((product) => (
            <div key={product.id}>
              <ProductCard product={product} />
            </div>
          ))}
        </CollectionWrapperServer>
      </div>
    </Suspense>
  );
}

const QUERY = gql`
  query NotFoundProductDetails(
    $countryCode: CountryCode
    $language: LanguageCode
  ) @inContext(country: $countryCode, language: $language) {
    products(first: 3) {
      edges {
        node {
          handle
          id
          title
          variants(first: 1) {
            edges {
              node {
                id
                title
                availableForSale
                image {
                  id
                  url
                  altText
                  width
                  height
                }
                priceV2 {
                  currencyCode
                  amount
                }
                compareAtPriceV2 {
                  currencyCode
                  amount
                }
              }
            }
          }
        }
      }
    }
  }
`;
