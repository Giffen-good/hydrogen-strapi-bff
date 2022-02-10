import {useShopQuery} from '@shopify/hydrogen';
import gql from 'graphql-tag';

import Seo from './Seo.client';

/**
 * A server component that fetches a `shop.name` and sets default values and templates for every page on a website
 */
export default function DefaultSeo() {
  return <Seo shopName={'Black Fashion Fair'} />;
}
