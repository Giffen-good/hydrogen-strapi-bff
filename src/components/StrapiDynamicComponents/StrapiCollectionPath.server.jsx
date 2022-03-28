import qs from 'qs';
import {useQuery} from '@shopify/hydrogen';
import {Suspense} from 'react';
import Layout from '../LayoutCollection.server';
import StrapiDynamicZone from '../StrapiHelpers/StrapiDynamicZone';

export default function StrapiCollectionPath({params, path}) {
  const {handle} = params;
  const query = qs.stringify(
    {
      populate: 'deep',
      filters: {
        slug: {
          $eq: handle,
        },
        pathname: {
          $eq: path,
        },
      },
      publicationState: 'live',
      locale: ['en'],
    },
    {
      encodeValuesOnly: true, // prettify url
    },
  );
  const {data} = useQuery(
    [
      `page_strapi_collection_path_${handle}`,
      `key_strapi_collection_path_${handle}`,
    ],
    async () => {
      const res = await fetch(
        `${import.meta.env.VITE_STRAPI}/api/pages?${query}`,
        {
          headers: {
            accept: 'application/json',
          },
        },
      );
      return await res.json();
    },
  );
  return (
    <Suspense fallback={<BoxFallback />}>
      <Layout isStrapiTemplate={true}>
        <div className="relative mb-12 site-wrapper">
          <StrapiDynamicZone data={data.data} />
        </div>
      </Layout>
    </Suspense>
  );
}
function BoxFallback() {
  return <div className="bg-white p-12 shadow-xl rounded-xl mb-10 h-40"></div>;
}
