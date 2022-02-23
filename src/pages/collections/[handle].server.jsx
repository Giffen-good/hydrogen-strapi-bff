import {
  MediaFileFragment,
  ProductProviderFragment,
  useShopQuery,
  flattenConnection,
  RawHtml,
} from '@shopify/hydrogen';
import gql from 'graphql-tag';
import CollectionNavigation from '../../components/CollectionNavigation';

import LoadMoreProducts from '../../components/LoadMoreProducts.client';
import ProductCard from '../../components/ProductCard';
import NotFound from '../../components/NotFound.server';

import CollectionWrapper from '../../components/CollectionWrapper.server';
import LayoutShopify from '../../components/LayoutShopify.server';
import {HEADER_PARAMS} from '../../components/StrapiHelpers/util';

export default function Collection({
  country = {isoCode: 'US'},
  collectionProductCount = 24,
  params,
}) {
  const {handle} = params;
  const {data} = useShopQuery({
    query: QUERY,
    variables: {
      handle,
      country: country.isoCode,
      numProducts: collectionProductCount,
    },
  });

  if (data?.collection == null) {
    return <NotFound />;
  }

  const {data: collectionList} = useShopQuery({
    query: COLLLECTIONS_QUERY,
    variables: {
      numCollections: 3,
    },
    cache: {
      maxAge: 60,
      staleWhileRevalidate: 60 * 10,
    },
  });
  const collections = collectionList
    ? flattenConnection(collectionList.collections)
    : null;
  const collection = data.collection;
  const products = flattenConnection(collection.products);
  const hasNextPage = data.collection.products.pageInfo.hasNextPage;
  return (
    <LayoutShopify headerSettings={HEADER_PARAMS}>
      <RawHtml string={collection.descriptionHtml} className="text-lg" />
      <section className={'header-offset'}>
        <CollectionNavigation data={collections} handle={handle} />
        <CollectionWrapper>
          {products.map((product) => (
            <div key={product.id}>
              <ProductCard product={product} />
            </div>
          ))}
        </CollectionWrapper>
      </section>
      {hasNextPage && (
        <LoadMoreProducts startingCount={collectionProductCount} />
      )}
    </LayoutShopify>
  );
}

const QUERY = gql`
  query CollectionDetails(
    $handle: String!
    $country: CountryCode
    $numProducts: Int!
    $includeReferenceMetafieldDetails: Boolean = false
    $numProductMetafields: Int = 0
    $numProductVariants: Int = 250
    $numProductMedia: Int = 6
    $numProductVariantMetafields: Int = 0
    $numProductVariantSellingPlanAllocations: Int = 0
    $numProductSellingPlanGroups: Int = 0
    $numProductSellingPlans: Int = 0
  ) @inContext(country: $country) {
    collection(handle: $handle) {
      id
      title
      descriptionHtml

      products(first: $numProducts) {
        edges {
          node {
            vendor
            ...ProductProviderFragment
          }
        }
        pageInfo {
          hasNextPage
        }
      }
    }
  }

  ${MediaFileFragment}
  ${ProductProviderFragment}
`;
const COLLLECTIONS_QUERY = gql`
  query indexContent($numCollections: Int!) {
    collections(first: $numCollections) {
      edges {
        node {
          description
          handle
          id
          title
        }
      }
    }
  }
`;