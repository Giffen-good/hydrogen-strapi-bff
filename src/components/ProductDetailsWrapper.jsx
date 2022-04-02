import ProductDetails from './ProductDetails.client';
import gql from 'graphql-tag';
import {useShopQuery} from '@shopify/hydrogen';
import qs from 'qs'
export default function ProductDetailsWrapper({product}) {
  const vendor = product.vendor ? product.vendor.replace(/[^a-zA-Z ]/g, "").toLowerCase().split(' ').join('-') : null
  const {data: designerData} = vendor ? useShopQuery({query: DESIGNER_QUERY, variables: {handle:vendor}}) : {data: null};
 
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
// const DESIGNER_QUERY = gql`
//   query PageDetails($id: String) {
//     page(id: $id) {
//       title
//       body
//     }
//   }
// `;
