import {
  useShopQuery,
  Seo,
  CacheLong,
  gql,
} from '@shopify/hydrogen';

import {Suspense} from 'react';
import LayoutStrapi from '../components/LayoutStrapi.server';
import qs from 'qs';
export default function Index({params, request}) {
  const {pathname} = new URL(request.url);
  const query = qs.stringify(
    {
      populate: 'deep',
      publicationState: 'live',
      locale: ['en'],
    },
    {
      encodeValuesOnly: true, // prettify url
    },
  );
  return (
    <Suspense>
      <LayoutStrapi
        isSingleType={true}
        ApiSlug={'root'}
        query={query}
        params={params}
        path={pathname}
        homepage={true}
        hasDynamicZone={true}
      />
    </Suspense>
  );
}

function SeoForHomepage() {
  const {
    data: {
      shop: {description},
    },
  } = useShopQuery({
    query: SEO_QUERY,
    cache: CacheLong(),
    preload: true,
  });

  return (
    <Seo
      type="homepage"
      data={{
        title: '',
        description,
      }}
    />
  );
}

const SEO_QUERY = gql`
  query homeShopInfo {
    shop {
      description
    }
  }
`;

const QUERY = gql`
  query indexContent($country: CountryCode, $language: LanguageCode)
  @inContext(country: $country, language: $language) {
    collections(first: 2) {
      edges {
        node {
          handle
          id
          title
          image {
            id
            url
            altText
            width
            height
          }
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
      }
    }
  }
`;
