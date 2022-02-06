import {useQuery} from '@shopify/hydrogen';

import Layout from '../components/Layout.server';
import {Suspense} from 'react';
import qs from 'qs';
import StrapiDynamicZone from '../components/StrapiDynamicZone';
import NotFound from '../components/NotFound.server';
export default function StrapiServer({params, request}) {
  const {handle} = params;
  const {pathname} = new URL(request.url);
  let p = pathname.split('/');
  const popped = p.slice(0, -1);
  const path = `${popped.join('/')}/`;
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
  const {data} = useQuery([`page_${pathname}`, `key_${pathname}`], async () => {
    const res = await fetch(
      `${import.meta.env.VITE_STRAPI}/api/pages?${query}`,
      {
        headers: {
          accept: 'application/json',
        },
      },
    );
    return await res.json();
  });
  if (!data?.data[0]) {
    return <NotFound />;
  }
  return (
    <Layout strapiData={data.data[0].attributes}>
      <div className="relative mb-12">
        <Suspense fallback={<BoxFallback />}>
          <StrapiDynamicZone data={data.data[0]} />
        </Suspense>
      </div>
    </Layout>
  );
}

function BoxFallback() {
  return <div className="bg-white p-12 shadow-xl rounded-xl mb-10 h-40"></div>;
}
