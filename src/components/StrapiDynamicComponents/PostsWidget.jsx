import StrapiMedia from '../StrapiMedia';
import Arrow from '../icons/Arrow';
import FreeLink from '../StrapiHelpers/FreeLink'
export default function PostsWidget({title, designer, pages, include_designer_in_title}) {
  let pageBlocks = [];
  let i = 0;
  let tmp = [];
  pages.data.forEach((p) => {
    tmp.push(p);
    if (i === 1) {
      pageBlocks.push(tmp);
      tmp = [];
      i = 0;
    } else {
      i++;
    }
  });
  return (
    <section className={'post-widget'}>
      <h2 className={' text-lg  font-semibold uppercase text-center pb-4'}>
        {title}
      </h2>
      <div className={'xl:flex-nowrap flex-wrap xl:max-w-none max-w-4xl flex gap-4 w-full mx-auto px-4 xl:px-10 sm:px-4 md:px-6 lg:px-8'}>
        {pageBlocks.map((block, k) => {
          return (
            <div
              className={
                'block xl:w-auto w-full gap-4 flex-auto xl:flex-1 grid sm:grid-cols-2 xl:flex  flex-auto xl:flex-nowrap flex-wrap xl:flex-1'
              }
              key={k}
            >
              {block.map((page, idx) => {
                return <PageBlock key={idx} page={page} />;
              })}
            </div>
          );
        })}
      </div>
    </section>
  );
}
const PageBlock = ({page}) => {
  const att = page.attributes;
  console.log(att)
  return (
    <FreeLink
      url={att.slug}
      classes={
        'block border-t-2 border-black gap-3 md:flex-1 flex flex-col flex-auto justify-between border-b-2 py-2 w-auto'
      }
    >
      <div className={'flex flex-1 '}>
        <div className={''}>
          {att.thumbnail.data ? (
            <StrapiMedia
              classes={
                'w-[6rem] h-[6.5rem] box-content pr-2 py-1 h-full object-cover'
              }
              media={att.thumbnail.data.attributes}
            />
          ) : (
            <div className={'fallback'}></div>
          )}
        </div>
        <div className={'flex-1 py-1 pl-2 flex flex-col h-full '}>
          <h4 className={'tracking-widest uppercase text-sm font-semibold'}>{att.designer}</h4>
          <h3
            className={
              'text-xl py-1  text-ellipsis line-clamp-2 overflow-hidden ...'
            }
          >
            {att.title}
          </h3>
          <div className={'flex-grow'}></div>
          <div
            className={
              'text-xs pb-[0.3rem] post-widget-title items-center uppercase flex justify-between'
            }
          >
            <h6 className={'text-xs'}>Read More</h6>
            <Arrow />
          </div>
        </div>
      </div>
    </FreeLink>
  );
};
