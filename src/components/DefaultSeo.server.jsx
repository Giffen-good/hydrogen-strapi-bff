import {useShopQuery, Seo, CacheLong, Head, gql} from '@shopify/hydrogen';
/**
 * A server component that fetches a `shop.name` and sets default values and templates for every page on a website
 */
export default function DefaultSeo() {
  const {
    data: {
      shop: {name, description},
    },
  } = useShopQuery({
    query: QUERY,
    cache: CacheLong(),
    preload: '*',
  });

  return (
    <>
      <Seo
        type="defaultSeo"
        data={{
          title: name,
          description,
          titleTemplate: `%s  —  ${name}`
        }}
      />
      {/*<Head>*/}
      {/*  <!-- COMMON TAGS -->*/}
      {/*  <meta charset="utf-8">*/}
      {/*    <!-- Search Engine -->*/}
      {/*    <meta name="image" content="https://example.com/image.jpg">*/}
      {/*      <!-- Schema.org for Google -->*/}
      {/*      <meta itemprop="image" content="https://example.com/image.jpg">*/}
      {/*        <!-- Twitter -->*/}
      {/*        <meta name="twitter:card" content="summary">*/}
      {/*          <meta name="twitter:site" content="@BFASHIONFAIR">*/}
      {/*            <meta name="twitter:image:src" content="https://www.blackfashionfair.org">*/}
      {/*              <!-- Open Graph general (Facebook, Pinterest & Google+) -->*/}
      {/*              <meta name="og:image" content="https://example.com/image.jpg">*/}
      {/*                <meta name="og:url" content="https://www.blackfashionfair.org">*/}
      {/*                  <meta name="og:site_name" content="Black Fashion Fair">*/}
      {/*                    <meta name="og:type" content="website">*/}
      {/*</Head>*/}
    </>
  );
}

const QUERY = gql`
  query shopInfo {
    shop {
      name
      description
    }
  }
`;
