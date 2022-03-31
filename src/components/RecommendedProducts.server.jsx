import {
  flattenConnection,
  ProductProviderFragment,
  useShopQuery,
} from '@shopify/hydrogen';
import gql from 'graphql-tag';
import {Suspense} from 'react';
import ProductCard from './ProductCard';
import CollectionWrapperServer from './CollectionWrapper.server';
export default function RecommendedProductsServer({country}) {
  const {data} = useShopQuery({
    query: QUERY,
    variables: {
      country: country.isoCode,
      numProductMetafields: 0,
      numProductVariants: 250,
      numProductMedia: 0,
      numProductVariantMetafields: 0,
      numProductVariantSellingPlanAllocations: 0,
      numProductSellingPlanGroups: 0,
      numProductSellingPlans: 0,
    },
  });
  const products = data ? flattenConnection(data.products) : [];
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
    $country: CountryCode
    $includeReferenceMetafieldDetails: Boolean = false
    $numProductMetafields: Int!
    $numProductVariants: Int!
    $numProductMedia: Int!
    $numProductVariantMetafields: Int!
    $numProductVariantSellingPlanAllocations: Int!
    $numProductSellingPlanGroups: Int!
    $numProductSellingPlans: Int!
  ) @inContext(country: $country) {
    products(first: 3) {
      edges {
        node {
          ...ProductProviderFragment
        }
      }
    }
  }

  ${ProductProviderFragment}
`;
