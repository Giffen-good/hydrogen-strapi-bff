import StrapiMedia from '../StrapiMedia';
import FreeLink from '../StrapiHelpers/FreeLink';

export default function FeaturedPost({
  button_link,
  button_text,
  excerpt,
  justified_text,
  banner_image,
  title_image,
}) {
  const lines = justified_text ? justified_text.split('\n') : [];
  const media = title_image?.data?.attributes
    ? title_image.data.attributes
    : null;
  const banner = banner_image?.data?.attributes
    ? banner_image.data.attributes
    : null;
  return (
    <section className={'article-info-section flush flex-col flex flex-wrap'}>
      <section className={'banner flush relative flex-grow'}>
        <StrapiMedia
          classes={'absolute h-full w-full  object-cover'}
          media={banner}
        />
      </section>
      <section className={'lg:hidden'}>
          <section className={'banner flush relative flex-grow'}>
          <StrapiMedia
            classes={'absolute h-full w-full  object-cover'}
            media={banner}
          />
        </section>
        <div className={'flex-auto w-full lg:flex-1 pr-12 '}>
          <StrapiMedia classes={'xl:max-w-md mx-auto'} media={media} />
        </div></section>
      <section
        className={
          ' gutter  w-full   pt-6 pb-3 flex grow-0 flex-wrap md:flex-no-wrap text-white'
        }
      >
        <div className={'flex-auto w-full lg:flex-1 pr-12 '}>
          <StrapiMedia classes={'xl:max-w-md mx-auto'} media={media} />
        </div>
        <div className={'flex-auto w-full lg:flex-1'}>
          <div className={'pb-8 xl:pb-6 text-justify pr-4'}>
            <p>{excerpt}</p>
          </div>
          <div
            className={
              'flex justify-between items-center flex-wrap xl:flex-nowrap'
            }
          >
            <FreeLink url={button_link} classes={''}>
              <button
                className={
                  'hover:bg-white hover:text-black font-semibold text-xs px-11 py-4 border uppercase border-current rounded-3xl'
                }
              >
                {button_text}
              </button>
            </FreeLink>
        
            <div
              className={
                'w-full max-w-xs xl:pb-0 grow-0 uppercase flex-auto text-sm w-60 xl:order-2 order-1'
              }
            >
              {lines.map((l, idx) => {
                return <div key={idx}>{l}</div>
              })}
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}
