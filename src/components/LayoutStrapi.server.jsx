import {useQuery} from '@shopify/hydrogen';

import {Suspense} from 'react';
import StrapiDynamicZone from './StrapiHelpers/StrapiDynamicZone';
import BuildStrapiPage from './StrapiHelpers/BuildStrapiPage';
import HeaderFallback from './FallbackHeader';
import Header from './Header';
import FooterServer from './Footer.server';
import FooterSettings from './Footer';
import NotFound from './NotFound.server';
import {
  sanityCheckToAttributes,
  getGlobalPageSettings,
} from './StrapiHelpers/util';
export default function StrapiCollectionServer({
  path,
  isSingleType,
  ApiSlug,
  query,
  hasDynamicZone,
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
  console.log( `${import.meta.env.VITE_STRAPI}/api/${ApiSlug}?${query}`,)
  if (data?.error || data?.data == null) return <NotFound />;
  const p = getStrapiData(data, isSingleType, hasDynamicZone);
  console.log(p)
  if (!isSingleType && !p) return <NotFound />;
  const {backgroundColor, flush, useSpecialLayout, useNavigation} =
    getGlobalPageSettings(p?.page_settings);
  return (
    <>
      <Suspense fallback={<HeaderFallback />}>
        <Header
          params={p}
          backgroundTransparency={flush}
          useSpecialLayout={useSpecialLayout}
          useNavigation={useNavigation}
        />
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
            <div className="relative mb-12 site-wrapper">
              <BuildStrapiPage data={p} slug={ApiSlug}>
                <StrapiDynamicZone mainContent={p?.main_content} />
              </BuildStrapiPage>
            </div>
          </div>
        </main>
      </Suspense>
      <Suspense fallback={null}>
        <FooterSettings backgroundColor={backgroundColor}>
          <FooterServer />
        </FooterSettings>
      </Suspense>
    </>
  );
}
function getStrapiData(data, isSingleType) {
  if (!sanityCheckToAttributes(data)) return null;
  if (isSingleType) {
    return data.data.attributes;
  } else {
    return data.data[0]?.attributes;
  }
}

function BoxFallback() {
  return <div className="bg-white p-12 shadow-xl rounded-xl mb-10 h-40"></div>;
}
function MainContent() {
  return <main role="main" id="mainContent" className={`relative  `}></main>;
}
