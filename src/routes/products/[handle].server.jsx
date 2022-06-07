import {
  useSession,
  useShop,
  useShopQuery,
  Seo,
  useRouteParams,
  gql,
} from '@shopify/hydrogen';

import ProductDetails from '../../components/ProductDetails.client';
import NotFound from '../../components/NotFound.server';
import LayoutShopify from '../../components/LayoutShopify.server';
import RecommendedProductsServer from '../../components/RecommendedProducts.server';
import {HEADER_PARAMS} from '../../components/StrapiHelpers/util';
import {useParsedMetafields} from '@shopify/hydrogen/client';
export default function Product({country = {isoCode: 'US'}, params}) {
  const {handle} = useRouteParams();
  const {countryCode = 'US'} = useSession();

  const {languageCode} = useShop();

  const {
    data
  } = useShopQuery({
    query: QUERY,
    variables: {
      country: countryCode,
      language: languageCode,
      handle,
    },
    preload: true,
  });
  if (!data.product) {
    return <NotFound />;
  }
  const productMetafields = useParsedMetafields(data.product.metafields);
  const designer = productMetafields.find(
    (metafield) =>
      metafield.namespace === 'my_fields' && metafield.key === 'designer',
  );
  const id = designer ? designer.value.split('/')[designer.value.split('/').length - 1] : ''
  const vendor = data.product.vendor ? data.product.vendor.replace(/[^a-zA-Z ]/g, "").toLowerCase().split(' ').join('-') : null
  const {data: designerData} = vendor ? useShopQuery({query: DESIGNER_QUERY, variables: {handle:vendor}}) : {data: null};

  return (
    <LayoutShopify headerSettings={HEADER_PARAMS}>
      <Seo type="product" data={data} />

      <ProductDetails product={data.product} designerData={designerData} />
      <RecommendedProductsServer />
    </LayoutShopify>
  );
}


const DESIGNER_QUERY = gql`
  query PageDetails($handle: String!) {
    pageByHandle(handle: $handle) {
      title
      body
    }
  }
`;

const QUERY = gql`
  query product(
    $country: CountryCode
    $language: LanguageCode
    $handle: String!
  ) @inContext(country: $country, language: $language) {
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
      metafields(first: 20) {
        edges {
          node {
            id
            type
            namespace
            key
            value
            createdAt
            updatedAt
            description
            reference {
              __typename
              ... on MediaImage {
                id
                mediaContentType
                image {
                  id
                  url
                  altText
                  width
                  height
                }
              }
            }
          }
        }
      }
      media(first: 6) {
        edges {
          node {
            ... on MediaImage {
              mediaContentType
              image {
                id
                url
                altText
                width
                height
              }
            }
            ... on Video {
              mediaContentType
              id
              previewImage {
                url
              }
              sources {
                mimeType
                url
              }
            }
            ... on ExternalVideo {
              mediaContentType
              id
              embedUrl
              host
            }
            ... on Model3d {
              mediaContentType
              id
              alt
              mediaContentType
              previewImage {
                url
              }
              sources {
                url
              }
            }
          }
        }
      }
      priceRange {
        maxVariantPrice {
          currencyCode
          amount
        }
        minVariantPrice {
          currencyCode
          amount
        }
      }
      seo {
        description
        title
      }
      title
      description
      variants(first: 250) {
        edges {
          node {
            availableForSale
            compareAtPriceV2 {
              amount
              currencyCode
            }
            id
            image {
              id
              url
              altText
              width
              height
            }
            priceV2 {
              amount
              currencyCode
            }
            selectedOptions {
              name
              value
            }
            sku
            title
            unitPrice {
              amount
              currencyCode
            }
            unitPriceMeasurement {
              measuredType
              quantityUnit
              quantityValue
              referenceUnit
              referenceValue
            }
          }
        }
      }
      vendor
    }
  }
`;

