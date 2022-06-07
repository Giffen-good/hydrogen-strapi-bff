import ProductDetails from './ProductDetails.client';
import gql from 'graphql-tag';
import {useShopQuery} from '@shopify/hydrogen';
import qs from 'qs'
import { useParsedMetafields } from "@shopify/hydrogen/client";
export default function ProductDetailsWrapper({product}) {
  const productMetafields = useParsedMetafields(product.metafields);
  const designer = productMetafields.find(
    (metafield) =>
      metafield.namespace === 'my_fields' && metafield.key === 'designer',
  );
  let id;
  if (designer) {
    id = designer.value.split('/')[designer.value.split('/').length - 1];
  }
  console.log(id)
  const vendor = product.vendor ? product.vendor.replace(/[^a-zA-Z ]/g, "").toLowerCase().split(' ').join('-') : null
  // const {data: designerData} = vendor ? useShopQuery({query: DESIGNER_QUERY, variables: {id:id}}) : {data: null};

    return <ProductDetails product={product} />
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
