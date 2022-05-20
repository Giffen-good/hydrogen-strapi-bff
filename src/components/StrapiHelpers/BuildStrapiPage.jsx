import {getFont, getGlobalPageSettings} from '../StrapiHelpers/util';
import AlphabetPage from '../StrapiPages/AlphabetPage';
import SocialSharingWidget from '../StrapiPartials/SocialSharingWidget.client'
import ArticleTagWrapper from '../StrapiPartials/ArticleTagWrapper.client'
import HeadlineCredit from "../StrapiDynamicComponents/HeadlineCredit";
import {copyrightText} from "../StrapiHelpers/util";
import BottomCreditsClient from "../StrapiPartials/BottomCredits.client";
import StrapiBackgroundColor from "../StrapiWrappers/StrapiBackgroundColor";
export default function BuildStrapiPage({data, slug, children}) {
  return (
    <StructuredPage data={data} slug={slug}>
      {children}
    </StructuredPage>
  );
}
function StructuredPage({data, slug, children}) {
  // console.log(data)
  const fullTitle = `${data.title_drop_text} ${data.title}`
  const {footerBackgroundColor, footerTextColor} = getGlobalPageSettings(data?.page_settings);
  let styles = {
    backgroundColor: footerBackgroundColor ? footerBackgroundColor : 'inherit',
    color: footerTextColor ? footerTextColor : 'inherit'
  }
  if (slug == 'conversations' || slug == 'essays' || slug == 'presses') return (
    <div className={'article-layout pt-10 '}>

      <div className={'gutter article-title'}>
        <div className={' '}>
          <h1 className="md:text-8xl text-6xl lg:text-9xl xl:text-10xl uppercase lg:pr-16 "><span className={`${getFont(data.drop_text_style)} `}>{data.title_drop_text}</span> <span className={`${getFont(data.title_text_style)} `}>{data.title}</span></h1>
          <div className={'credits-widget  relative lg:pr-16 mt-4 lg:mt-8 xl:mt-10'}
          >
            <div className={' flex items-center justify-between  md:pr-10 max-w-screen-xl	'}>
              <div>
                  {data.top_credits && data.top_credits.words_credit ? 
                  <>
                    <h3 className={'font-serif uppercase text-xl'}>Words</h3>
                    <h2 className={'font-semibold uppercase'}>{data.top_credits.words_credit}</h2>
                  </> : ''}
                </div>
              
                <div className={'text-right'}>
                  {data.top_credits && data.top_credits.documented_credit ? 
                  <>
                    <h3 className={'font-serif uppercase text-xl'}>Documented</h3>
                    <h2 className={'font-semibold uppercase'}>{data.top_credits.documented_credit}</h2>
                  </> : ''}
                </div>
            </div>
            <div className={'uppercase font-semibold absolute date-centered'}>
                  {getDate(data.date)}
            </div>
              
            </div>

        </div>
      </div>
      <div className={'relative pt-48'}>
        <SocialSharingWidget title={fullTitle} />
        <div className={`main-article-content ${data.post_tags ? 'neg-offset' : ''}`} id="main-article-content">
          {children}
        </div>
      </div>
      { data.post_tags ? 
          <ArticleTagWrapper>
            <div  style={styles} className={'pt-8 gutter'}>
              <h4 style={{borderColor: footerTextColor ? footerTextColor : 'inherit'}} className={'text-xl uppercase font-semibold pb-2 border-b-2'}>In this Article</h4>
              <div className={'flex justify-between pt-6'}>
                <InThisArticleWidget type={'Topics'} d={data.post_tags.topics} />
                <InThisArticleWidget type={'People'} d={data.post_tags.people} />
                <InThisArticleWidget type={'Organizations'} d={data.post_tags.organization} />
                <InThisArticleWidget type={'Location'} d={data.post_tags.location} />
              </div>
            </div>
          </ArticleTagWrapper>
      : ""}
    </div>
  )
  if (slug == 'alphabet') return <AlphabetPage {...data} />;
  console.log(data.bottom_credits)
  if (slug == 'stories') return (
        <div className={'article-layout stories relative'}>
          <StrapiBackgroundColor bg_color={data.top_credits_component_bg_color} font_color={data.top_credits_component_font_color} >
            <div className={'absolute top-0 gutter w-full narrow-gutter header-offset inset-x-0 uppercase'}>
              <h1 className={'text-center text-8xl mt-8'}>{data.title}</h1>
              {data.date ? <h4 className={'text-center mt-4 font-semibold'}>{getDate(data.date)}</h4> : '' }
              { data.top_credits ? <div className={'narrower-gutter'}> <HeadlineCredit credit_part={data.top_credits.credit_part} /></div> : ''}
            </div>
          </StrapiBackgroundColor>
          <div className={`main-article-content ${data.post_tags ? 'neg-offset' : ''}`} id="main-article-content">
            {children}
          </div>
            {data.bottom_credits ?
                <StrapiBackgroundColor bg_color={data.bottom_credits_component_bg_color} font_color={data.bottom_credits_component_font_color} >
                  <BottomCreditsClient credits={data.bottom_credits} copy={copyrightText()} />
                </StrapiBackgroundColor>
                  : ''}
        </div>
  )
  return <>{children}</>

}
function InThisArticleWidget({type, d}) {
  if (!d) return
  return (
    <div>
      <h6 className="">{type}</h6>
      {d.map((r) => (
        <h5 className="font-semibold uppercase">{r.item}</h5>
      ))}
    </div>
  )
}
function getDate(date) {
  if (!date) return
  const months= ["January","February","March","April","May","June","July",
  "August","September","October","November","December"];
  const parts = date.split('-')
  const month = months[Number(parts[1])]
  return parts[2] + ' ' +  month + ' ' + parts[0];

}
