import { useQuery, Seo, useShopQuery, CacheDays } from "@shopify/hydrogen";

import {Suspense} from 'react';
import StrapiDynamicZone from './StrapiHelpers/StrapiDynamicZone';
import BuildStrapiPage from './StrapiHelpers/BuildStrapiPage';
import HeaderFallback from './FallbackHeader';
import Header from './Header';
import FooterServer from './Footer.server';
import FooterSettings from './Footer';
import NotFound from './NotFound.server';
import TransitionLayout from "./TransitionLayout.client";
import {Head} from '@shopify/hydrogen';

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

  if (!isSingleType && !p) return <NotFound />;

  const {backgroundColor, flush, useSpecialLayout, useNavigation, useSpecialFooter, useFullLogo, footerTextColor, footerBackgroundColor} =
    getGlobalPageSettings(p?.page_settings);
  function SEO() {
    const {meta_title, meta_description} = p?.page_settings
    return (
      <Head titleTemplate="%s">
        { meta_title ? (<title>{`${meta_title} — Black Fashion Fair`}</title>) : '' }
        { meta_description ? (<meta property={'description'} content={meta_description} />) : ''}
      </Head>
    )
  }

  return (
    <>
      <Suspense fallback={<HeaderFallback />}>
        <Header
          useFullLogo={useFullLogo}
          params={p}
          flush={flush}
          backgroundTransparency={flush}
          useSpecialLayout={useSpecialLayout}
          useNavigation={useNavigation}
        />
      </Suspense>

      <Suspense fallback={<MainContent />}>
        <TransitionLayout classes={'main-body-area'}>
          <SEO />
        <main
          role="main"
          id="mainContent"
          className={`relative ${flush ? '' : 'header-offset'} `}
          style={{
            backgroundColor: backgroundColor ? backgroundColor : 'inherit',
          }}
        >
          <div className="flex flex-col max-w-screen text-black font-sans">
            <div className="relative site-wrapper">
              <BuildStrapiPage data={p} slug={ApiSlug}>
                <StrapiDynamicZone mainContent={p?.main_content} />
              </BuildStrapiPage>
            </div>
          </div>
        </main>
      </TransitionLayout>
      </Suspense>
      <Suspense fallback={null}>
        <TransitionLayout>
          {useNavigation ? (
            <FooterSettings textColor={footerTextColor} backgroundColor={footerBackgroundColor}  >
              <FooterServer  useSpecialFooter={useSpecialFooter} />
            </FooterSettings>
          ) : ''}
        </TransitionLayout>
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
