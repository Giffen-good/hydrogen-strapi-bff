import ProductDetails from './ProductDetails.client';
import gql from 'graphql-tag';
import {useShopQuery} from '@shopify/hydrogen';

export default function ProductDetailsWrapper({product}) {
    const designer = product.vendor.replace(/[^a-zA-Z ]/g, "").toLowerCase().split(' ').join('-')
    // const vendor = product.vendor.toLowerCase().split(' ').join('-');
    // console.log(product.metafields.edges)
    // let designer;
    // const mf = product.metafields.edges;
    // for (let i = 0; i < mf.length;i++) {
    //   console.log(mf[i])
    //   if (mf[i]?.node && mf[i].key === 'designer') designer = mf[i];
    // }
    const {data: designerData} = designer ? useShopQuery({query: DESIGNER_QUERY, variables: {handle:designer}}) : {data: null};
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
