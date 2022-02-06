import {useQuery} from '@shopify/hydrogen';

import Layout from '../../components/Layout.server';
import {Suspense} from 'react';
import StrapiDynamicZone from '../../components/StrapiDynamicZone';
import NotFound from '../../components/NotFound.server';
export default function Index({params}) {
  const {handle} = params;
  const {data} = useQuery(
    [`designer_${handle}`, `designer_key_${handle}`],
    async () => {
      const res = await fetch(
        `${import.meta.env.VITE_STRAPI}/api/alphabet?populate=deep`,
        {
          headers: {
            accept: 'application/json',
          },
        },
      );
      return await res.json();
    },
  );
  if (!data.data) {
    return <NotFound />;
  }
  return (
    <Layout strapiData={data.data.attributes}>
      <div className="relative">
        <Suspense fallback={<BoxFallback />}>
          <StrapiDynamicZone data={data.data} />
        </Suspense>
      </div>
    </Layout>
  );
}

function BoxFallback() {
  return <div className="bg-white p-12 shadow-xl rounded-xl mb-10 h-40"></div>;
}
