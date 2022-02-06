// import qs from 'qs';
// import axios from 'axios';
// import Layout from './Layout.server';
// import {useEffect} from 'react';
//
// export default function NotFoundInShopify() {
//   useEffect(() => {});
//   return (
//     <Layout>
//       <div className="py-10 border-b border-gray-200">
//         <div className="my-8">CUSTOM PAGE</div>
//       </div>
//     </Layout>
//   );
// }
// const getPageRoutes = async () => {
//   const query = qs.stringify(
//     {
//       populate: '*',
//       fields: ['slug'],
//       publicationState: 'live',
//       locale: ['en'],
//     },
//     {
//       encodeValuesOnly: true, // prettify url
//     },
//   );
//
//   const res2 = await axios.get(
//     `${import.meta.env.VITE_STRAPI}/api/articles?${query}&populate=*`,
//   );
//   let slugs = [];
//   for (let i = 0; i < res2.data.data.length; i++) {
//     const slug = res2.data.data[i].attributes.slug;
//     if (slug) {
//       slugs.push(slug);
//     }
//   }
//   return slugs;
// };
