import {useShopQuery, ProductProviderFragment} from '@shopify/hydrogen';
import gql from 'graphql-tag';

import ProductDetailsWrapper from '../../components/ProductDetailsWrapper';
import NotFound from '../../components/NotFound.server';
import LayoutShopify from '../../components/LayoutShopify.server';
import RecommendedProductsServer from '../../components/RecommendedProducts.server';
import {HEADER_PARAMS} from '../../components/StrapiHelpers/util';
export default function Product({country = {isoCode: 'US'}, params}) {
  const {handle} = params;
  const {data} = useShopQuery({
    query: QUERY,
    variables: {
      country: country.isoCode,
      handle,
    },
  });

  if (!data.product) {
    return <NotFound />;
  }

  return (
    <LayoutShopify headerSettings={HEADER_PARAMS}>
      <ProductDetailsWrapper product={data.product} />
      <RecommendedProductsServer country={country} />
    </LayoutShopify>
  );
}

const QUERY = gql`
  query product(
    $country: CountryCode
    $handle: String!
    $includeReferenceMetafieldDetails: Boolean = true
    $numProductMetafields: Int = 20
    $numProductVariants: Int = 250
    $numProductMedia: Int = 6
    $numProductVariantMetafields: Int = 10
    $numProductVariantSellingPlanAllocations: Int = 0
    $numProductSellingPlanGroups: Int = 0
    $numProductSellingPlans: Int = 0
  ) @inContext(country: $country) {
    product: product(handle: $handle) {
      id
      vendor
      seo {
        title
        description
      }
      images(first: 1) {
        edges {
          node {
            url
          }
        }
      }
      ...ProductProviderFragment
    }
  }

  ${ProductProviderFragment}
`;

// designer: metafield(namespace: "my_fields", key: "designer") {
//   value
//   type
// }