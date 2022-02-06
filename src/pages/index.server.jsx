import {useQuery} from '@shopify/hydrogen';

import Layout from '../components/Layout.server';
import {Suspense} from 'react';
import StrapiDynamicZone from '../components/StrapiDynamicZone';
import NotFound from '../components/NotFound.server';
import Newsletter from '../components/StrapiDynamicComponents/Newsletter';
export default function Index({params}) {
  const {handle} = params;
  const {data} = useQuery([`home_${handle}`, `key_${handle}`], async () => {
    const res = await fetch(
      `${import.meta.env.VITE_STRAPI}/api/root?populate=deep`,
      {
        headers: {
          accept: 'application/json',
        },
      },
    );
    return await res.json();
  });
  if (!data.data) {
    return <NotFound />;
  }
  let is_landing_page = false;
  if (data.data.attributes?.is_landing_page)
    is_landing_page = data.data.attributes.is_landing_page;
  return (
    <Layout strapiData={data.data.attributes}>
      <div className="relative">
        <Suspense fallback={<BoxFallback />}>
          {is_landing_page ? (
            <section className={'newsletter-container'}>
              <Newsletter landingSection={true} />
            </section>
          ) : (
            <StrapiDynamicZone data={data.data} />
          )}
        </Suspense>
      </div>
    </Layout>
  );
}

function BoxFallback() {
  return <div className="bg-white p-12 shadow-xl rounded-xl mb-10 h-40"></div>;
}
