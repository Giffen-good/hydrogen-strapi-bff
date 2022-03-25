import ProductDetails from './ProductDetails.client';
import gql from 'graphql-tag';
import {useShopQuery} from '@shopify/hydrogen';

export default function ProductDetailsWrapper({product}) {
    const vendor = product.vendor.toLowerCase().split(' ').join('-');
    const {data: designerData} = useShopQuery({query: DESIGNER_QUERY, variables: {handle:vendor}});
    return <ProductDetails product={product} designerData={designerData} />
}


const DESIGNER_QUERY = gql`
  query PageDetails($handle: String!) {
    pageByHandle(handle: $handle) {
      title
      body
    }
  }
`;