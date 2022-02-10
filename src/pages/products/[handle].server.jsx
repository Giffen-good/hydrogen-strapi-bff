import {useShopQuery, ProductProviderFragment} from '@shopify/hydrogen';
import gql from 'graphql-tag';

import ProductDetails from '../../components/ProductDetails.client';
import NotFound from '../../components/NotFound.server';
import LayoutShopify from '../../components/LayoutShopify.server';
import RecommendedProductsServer from '../../components/RecommendedProducts.server';
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
    <LayoutShopify headerSettings={headerParams}>
      <ProductDetails product={data.product} />
      <RecommendedProductsServer country={country} />
    </LayoutShopify>
  );
}
const headerParams = {
  headerSettings: {
    backgroundTransparency: 'transparent',
    logoType: 'alt_logo',
    useNavigation: true,
    useSpecialLayout: false,
  },
  logo: null,
  navItems: null,
};
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
