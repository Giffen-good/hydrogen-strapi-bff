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
export default function Product({country = {isoCode: 'US'}, params}) {
  const {handle} = useRouteParams();
  const {countryCode = 'US'} = useSession();

  const {languageCode} = useShop();
  console.log('ahead of request..\n\n');
  const {data} = useShopQuery({
    query: QUERY,
    variables: {
      country: countryCode,
      language: languageCode,
      metafieldsIdentifiers: [
        {
          key: 'designer',
          namespace: 'my_fields',
        },
        {
          key: 'editor_s_notes',
          namespace: 'my_fields',
        },
      ],
      handle,
    },
    preload: true,
  });
  if (!data.product) {
    return <NotFound />;
  }
  const metafields = data.product.metafields;
  console.log('metafields', metafields)
  const designer = metafields  ? metafields.filter(m => m?.key === 'designer')[0] : null;
  const id = designer
    ? designer.value.split('/')[designer.value.split('/').length - 1]
    : '';
  const {data: designerData} = id
    ? useShopQuery({
        query: DESIGNER_QUERY,
        variables: {
          language: languageCode,
          id: `gid://shopify/Page/${id}`
        },
      })
    : {data: null};
  return (
    <LayoutShopify headerSettings={HEADER_PARAMS}>
      <Seo type="product" data={data} />

      <ProductDetails product={data.product} designer={designerData} />
      <RecommendedProductsServer />
    </LayoutShopify>
  );
}

const DESIGNER_QUERY = gql`
  query PageDetails($id: ID, $language: LanguageCode)
  @inContext(language: $language) {
    page(id: $id) {
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
    $metafieldsIdentifiers: [HasMetafieldsIdentifier!]!
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
      metafields(identifiers: $metafieldsIdentifiers) {
        id
        type
        namespace
        key
        value
        createdAt
        updatedAt
        description
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
