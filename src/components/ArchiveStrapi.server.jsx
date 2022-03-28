import {useQuery} from '@shopify/hydrogen';

import {Suspense} from 'react';
import StrapiDynamicZone from './StrapiHelpers/StrapiDynamicZone';
import BuildStrapiPage from './StrapiHelpers/BuildStrapiPage';
import HeaderFallback from './FallbackHeader';
import Header from './Header';
import FooterServer from './Footer.server';
import FooterSettings from './Footer';
import NotFound from './NotFound.server';
import RichTextBody from '../components/StrapiDynamicComponents/RichTextBody'
import FreeLink from '../components/StrapiHelpers/FreeLink'
import StrapiMedia from '../components/StrapiMedia'
import {
    HEADER_PARAMS,
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
  const p = data.errors ? null : data.data;
  if (!p) return <NotFound />;
  const slugName = ApiSlug === 'presses' ? 'press' : ApiSlug;
  return (
    <>
      <Suspense fallback={<HeaderFallback />}>
        <Header
          backgroundTransparency={HEADER_PARAMS.backgroundTransparency}
          useSpecialLayout={HEADER_PARAMS.useSpecialLayout}
          useNavigation={HEADER_PARAMS.useNavigation}
        />
      </Suspense>

      <Suspense fallback={<MainContent />}>
        <main
          role="main"
          id="mainContent"
          className={`relative header-offset `}
        >
          <div className="flex flex-col max-w-screen text-black font-sans">
            <div className="relative mb-12 site-wrapper">
                <h1 className={'text-8xl uppercase text-center pt-4 md:pt-8 font-serif pb-6 '}>{slugName}</h1>
                <section className={'grid xl:grid-cols-3 grid-cols-1 gap-14 md:grid-cols-2 gutter'}>
                    {p.map((post) => {
                        return <FreeLink url={`/${slugName}/${post.attributes.slug}`} classes={''}><PostWidget slug={ApiSlug} post={post} /></FreeLink>
                    })}
                </section>

            </div>
          </div>
        </main>
      </Suspense>
      <Suspense fallback={null}>
        <FooterSettings >
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
function PostWidget({slug, post}) {
    if (slug === 'conversations' || slug === 'essays') return (<PostWidgetOne post={post}  />)
    if (slug === 'stories') return (<PostWidgetTwo post={post}  />)
    if (slug === 'presses') return (<PostWidgetThree post={post}  />)
}
function PostWidgetOne({post}) {
    const att = post.attributes
    return (
        <article>
                <h4 className={'uppercase text-3xl font-serif text-yellow-bff pb-1 '}>{att.volume_tag}</h4>
                <h2 className={'uppercase text-4xl font-semibold pb-0.5'}>{att.title}</h2>
                <div className={'line-clamp-5'}>
                    <RichTextBody noGutter={true} noPadding={true}>
                        {att.excerpt}
                    </RichTextBody>
                </div>
                <h3 className={'uppercase pt-2 font-semibold'}>BY: {att.author}</h3>
        </article>
    )
}
function PostWidgetTwo({post}) {
    const att = post.attributes;
    const img = att.thumbnail.data?.attributes;
    return (
        <article>
                <div className={'six-9'}>{img ? <StrapiMedia media={img} classes={'absolute top-0 left-0 w-full h-full'} /> : ''}</div>
                <h2 className={'uppercase text-4xl font-semibold pb-0.5 pt-2'}>{att.title}</h2>
                <div className={'line-clamp-5'}>
                    <RichTextBody noGutter={true} noPadding={true}>
                        {att.excerpt}
                    </RichTextBody>
                </div>
                <h3 className={'uppercase pt-2 font-semibold'}>BY: {att.author}</h3>
        </article>
    )
}
function PostWidgetThree({post}) {
    const att = post.attributes;
    const img = att.thumbnail.data?.attributes;
    return (
        <article className={'text-center'}>
                <div className={'pb-2'}>{postDate(att.publishedAt)}</div>
                <div className={'sixty-five'}>{img ? <StrapiMedia media={img} classes={'absolute top-0 left-0 w-full h-full'} /> : ''}</div>
                <h2 className={'uppercase text-3xl font-semibold pb-2 pt-4'}>{att.title}</h2>
                <div className={'line-clamp-5'}>
                    <RichTextBody noGutter={true} noPadding={true}>
                        {att.excerpt}
                    </RichTextBody>
                </div>
        </article>
    )
}
function postDate(publishedAt) {
  const dateObj = new Date(publishedAt);
  const month = dateObj.getUTCMonth(); //months from 1-12
  const day = dateObj.getUTCDate();
  const year = dateObj.getUTCFullYear();
  const months= ["January","February","March","April","May","June","July",
            "August","September","October","November","December"];
  return `${day} ${months[month]} ${year}`;
}