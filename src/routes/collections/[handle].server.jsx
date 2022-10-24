import {
  useSession,
  useShop,
  useShopQuery,
  flattenConnection,
  useQuery,
  Seo,
  useLocalization,
  gql,
} from '@shopify/hydrogen';
import qs from 'qs';
import LoadMoreProducts from '../../components/LoadMoreProducts.client';
import LayoutShopify from '../../components/LayoutShopify.server';
import ProductCard from '../../components/ProductCard';
import NotFound from '../../components/NotFound.server';
import CollectionMobileNavigation from '../../components/CollectionMobileNavigation.client';
import CollectionNavigation from '../../components/CollectionNavigation';
import CollectionBanner from '../../components/CollectionBanner'
import {HEADER_PARAMS} from '../../components/StrapiHelpers/util';
import CollectionWrapper from '../../components/CollectionWrapper.server';

export default function Collection({collectionProductCount = 24, params}) {

  const {
    language: {isoCode: language},
    country: {isoCode: country},
  } = useLocalization();
  const {handle} = params;
  const {data} = useShopQuery({
    query: QUERY,
    variables: {
      handle,
      country,
      language,
      numProducts: collectionProductCount,
    },
    preload: true,
  });

  const {data: collectionList} = useShopQuery({
    query: COLLLECTIONS_QUERY,
    variables: {
      numCollections: 4,
    },
    cache: {
      maxAge: 60,
      staleWhileRevalidate: 60 * 10,
    },
  });
  if (data?.collection == null) {
    return <NotFound />;
  }
  const query = qs.stringify(
    {
      populate: 'deep',
      filters: {
        category: {
          $eq: handle,
        },
      },
      publicationState: 'live',
      locale: ['en'],
    },
    {
      encodeValuesOnly: true, // prettify url
    },
  );
  const {data: collectionBanner} = useQuery(
    [
      `path_strapi_collection_server_collectionBanner_${handle}`,
      `key_strapi_collection_server_collectionBanner_${handle}`,
    ],
    async () => {
      const res = await fetch(
        `${import.meta.env.VITE_STRAPI}/api/collection-banners?${query}`,
        {
          headers: {
            accept: 'application/json',
          },
        },
      );
      return await res.json();
    },
  );
  const collections = collectionList
    ? flattenConnection(collectionList.collections)
    : null;
  const collection = data.collection;
  const products = flattenConnection(collection.products);
  const hasNextPage = data.collection.products.pageInfo.hasNextPage;

  return (
      <LayoutShopify headerSettings={HEADER_PARAMS}>
        {/* the seo object will be expose in API version 2022-04 or later */}
        <Seo type="collection" data={collection} />
        <section className={'header-offset'}>
          <CollectionNavigation data={collections} handle={handle} />
          <CollectionBanner data={collectionBanner} />
          <CollectionMobileNavigation  data={collections} handle={handle}   />
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

const QUERY = gql`
  query CollectionDetails(
    $handle: String!
    $country: CountryCode
    $language: LanguageCode
    $numProducts: Int!
  ) @inContext(country: $country, language: $language) {
    collection(handle: $handle) {
      title
      descriptionHtml
      description
      seo {
        description
        title
      }
      image {
        id
        url
        width
        height
        altText
      }
      products(first: $numProducts) {
        edges {
          node {
            title
            vendor
            handle
            descriptionHtml
            compareAtPriceRange {
              maxVariantPrice {
                currencyCode
                amount
              }
              minVariantPrice {
                currencyCode
                amount
              }
            }
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
        pageInfo {
          hasNextPage
        }
      }
    }
  }
`;
