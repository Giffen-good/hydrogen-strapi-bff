import {useQuery} from '@shopify/hydrogen';

import {Suspense} from 'react';
import StrapiDynamicZone from '../components/StrapiDynamicZone';
import HeaderFallback from './FallbackHeader';
import Header from './Header';
import FooterServer from './Footer.server';
import FooterSettings from './Footer';
import NotFound from './NotFound.server';

export default function StrapiCollectionServer({
  path,
  isSingleType,
  ApiSlug,
  query,
}) {
  const {data} = useQuery(
    [
      `path_strapi_collection_server_${ApiSlug}_${query}_${path}`,
      `key_strapi_collection_server_${ApiSlug}_${query}_${path}`,
    ],
    async () => {
      const res = await fetch(
        `${import.meta.env.VITE_STRAPI}/api/${ApiSlug}?${query}`,
        {
          headers: {
            accept: 'application/json',
          },
        },
      );
      return await res.json();
    },
  );
  const p = getStrapiData(isSingleType, data);
  if (data?.error) return <NotFound />;
  const {backgroundColor, flush} = getGlobalPageSettings(p);
  return (
    <>
      <Suspense fallback={<HeaderFallback />}>
        <Header params={p} />
      </Suspense>

      <Suspense fallback={<MainContent />}>
        <main
          role="main"
          id="mainContent"
          className={`relative ${flush ? '' : 'header-offset'} `}
          style={{
            backgroundColor: backgroundColor ? backgroundColor : 'inherit',
          }}
        >
          <div className="flex flex-col max-w-screen text-black font-sans">
            <div className="relative mb-12">
              <StrapiDynamicZone data={p} />
            </div>
          </div>
        </main>
      </Suspense>
      <Suspense fallback={null}>
        <FooterSettings params={p}>
          <FooterServer />
        </FooterSettings>
      </Suspense>
    </>
  );
}
function getStrapiData(isSingleType, data) {
  if (isSingleType) return data.data ? data.data : null;
  return data.data[0] ? data.data[0] : null;
}
function getGlobalPageSettings(params) {
  let bgColor = null;
  let flush = null;
  if (params && has(params, 'attributes')) {
    if (params.attributes?.background_color)
      bgColor = params.attributes.background_color;
    if (params.attributes?.header_type == 'opaque') flush = true;
  }
  return {bgColor, flush};
}
function has(object, key) {
  return object ? hasOwnProperty.call(object, key) : false;
}

function BoxFallback() {
  return <div className="bg-white p-12 shadow-xl rounded-xl mb-10 h-40"></div>;
}
function MainContent() {
  return <main role="main" id="mainContent" className={`relative  `}></main>;
}
