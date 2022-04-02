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
  console.log(p)
  const slugName = ApiSlug === 'presses' ? 'press' : ApiSlug;
  return (
    <>
      <Suspense fallback={<HeaderFallback />}>
        <Header
          backgroundTransparency={HEADER_PARAMS.backgroundTransparency}
          useSpecialLayout={HEADER_PARAMS.useSpecialLayout}
          useNavigation={HEADER_PARAMS.useNavigation}
          flush={false}
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
                <h1 className={'text-8xl uppercase text-center pt-4 md:pt-8 font-semibold pb-6 '}>{slugName}</h1>
                <section className={'grid xl:grid-cols-3 grid-cols-1 gap-14 md:grid-cols-2 gutter'}>
                    {p.map((post) => {
                        return <PostWidget slug={ApiSlug} post={post} />
                    })}
                </section>

            </div>
          </div>
        </main>
      </Suspense>
      <Suspense fallback={null}>
        <FooterSettings backgroundColor={'#000'} >
          <div className={" text-white"}>
            <FooterServer />
          </div>
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
    if (slug === 'conversations' || slug === 'essays') return (<PostWidgetOne slug={slug} post={post}  />)
    if (slug === 'stories') return (<PostWidgetTwo post={post} slug={slug}  />)
    if (slug === 'presses') return (<ExternalPost post={post} />)
}
function PostWidgetOne({post, slug}) {
    const att = post.attributes
    return (
      <FreeLink url={`/${slug}/${post.attributes.slug}`} classes={''}>
        <article>
                <h4 className={'uppercase text-2xl font-serif text-yellow-bff pb-1 '}>{att.volume_tag}</h4>
                <h2 className={'uppercase text-3xl font-semibold pb-0.5'}>{att.title}</h2>
                <div className={'line-clamp-5 text-xs'}>
                    <RichTextBody noGutter={true} noPadding={true}>
                        {att.excerpt}
                    </RichTextBody>
                </div>
                <h3 className={'uppercase pt-2 text-xs font-semibold'}>BY: {att.author}</h3>
        </article>
      </FreeLink>
    )
}
function PostWidgetTwo({post, slug}) {
    const att = post.attributes;
    const img = att.thumbnail.data?.attributes;
    return (
      <FreeLink url={`/${slug}/${post.attributes.slug}`} classes={''}>
        <article>
                <div className={'six-9'}>{img ? <StrapiMedia media={img} classes={'absolute top-0 left-0 w-full h-full object-cover'} /> : ''}</div>
                <h2 className={'uppercase text-2xl font-semibold pb-0.5 pt-2'}>{att.title}</h2>
                <div className={'line-clamp-5 text-xs'}>
                    <RichTextBody noGutter={true} noPadding={true}>
                        {att.excerpt}
                    </RichTextBody>
                </div>
                <h3 className={'uppercase pt-2 font-semibold text-xs'}>BY: {att.author}</h3>
        </article>
      </FreeLink>
    )
}
function ExternalPost({post}) {
    const att = post.attributes;
    const img = att.thumbnail.data?.attributes;
    if (att.external_url) {
      return (
        <FreeLink url={`${att.external_url}`} classes={''}>
          <article className={'text-center'}>
                  <div className={'pb-2'}>{postDate(att.publishedAt)}</div>
                  <div className={'sixty-five'}>{img ? <StrapiMedia media={img} classes={'absolute top-0 left-0 w-full h-full object-cover'} /> : ''}</div>
                  <h2 className={'uppercase text-2xl font-semibold pb-2 pt-4'}>{att.title}</h2>
                  <div className={' text-xs'}>
                      <RichTextBody noGutter={true} noPadding={true}>
                          {att.excerpt}
                      </RichTextBody>
                  </div>
          </article>
          </FreeLink>
      )
    } else {
      return (
        <article className={'text-center'}>
                  {/* <div className={'pb-2'}>{postDate(att.publishedAt)}</div> */}
                  <div className={'sixty-five'}>{img ? <StrapiMedia media={img} classes={'absolute top-0 left-0 w-full h-full object-cover'} /> : ''}</div>
                  <h2 className={'uppercase text-2xl font-semibold pb-2 pt-4'}>{att.title}</h2>
                  <div className={' text-xs'}>
                      <RichTextBody noGutter={true} noPadding={true}>
                          {att.excerpt}
                      </RichTextBody>
                  </div>
          </article>
      )
    }
    
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