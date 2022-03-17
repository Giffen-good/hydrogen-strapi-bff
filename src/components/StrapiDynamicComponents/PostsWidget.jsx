import StrapiMedia from '../StrapiMedia';
import Arrow from '../icons/Arrow';

export default function PostsWidget({title, pages, include_designer_in_title}) {
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
      <h2 className={' text-lg  font-semibold uppercase text-center pb-2'}>
        {title}
      </h2>
      <div className={'lg:flex-nowrap flex-wrap flex gap-4 w-full gutter'}>
        {pageBlocks.map((block, k) => {
          return (
            <div
              className={
                'block lg:w-auto w-full gap-4 flex-auto lg:flex-1 flex  flex-auto md:flex-nowrap flex-wrap md:flex-1'
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
  return (
    <div
      className={
        'border-t border-black gap-3 md:flex-1 flex flex-col flex-auto justify-between border-b py-4 md:w-auto w-full'
      }
    >
      <div className={'flex flex-1 '}>
        <div className={''}>
          {att.thumbnail.data ? (
            <StrapiMedia
              classes={
                'w-[7.5rem] h-[8.5rem] box-content pr-2 py-1 h-full object-cover'
              }
              media={att.thumbnail.data.attributes}
            />
          ) : (
            <div className={'fallback'}></div>
          )}
        </div>
        <div className={'flex-1 py-1 pl-3 flex flex-col h-full '}>
          <h3 className={'text-2xl'}
          <h4
            className={
              'text-xl  text-ellipsis line-clamp-3 overflow-hidden ...'
            }
          >
            {att.title}
          </h4>
          <div className={'flex-grow'}></div>
          <div
            className={
              'text-xs pb-1 post-widget-title items-center font-semibold uppercase flex justify-between'
            }
          >
            <h6>Read More</h6>
            <Arrow />
          </div>
        </div>
      </div>
    </div>
  );
};
