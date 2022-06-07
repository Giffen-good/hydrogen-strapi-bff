import StrapiMedia from '../StrapiMedia';
import FreeLink from '../StrapiHelpers/FreeLink';
import JustifiedText from '../StrapiPartials/JustifiedText'
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
    <section className={'article-info-section pb-0 flush flex-col flex flex-wrap'}>
      <section className={'banner flush relative flex-grow'}>
        <StrapiMedia
          classes={'absolute h-full w-full  object-cover'}
          media={banner}
        />
      </section>
      <section
        className={
          ' gutter  w-full pt-4 pb-4 flex grow-0 flex-wrap md:flex-no-wrap text-white'
        }
      >
        <div className={'flex-auto w-full lg:flex-1 lg:pr-12 lg:px-0 sm:px-16 md:pt-6 md:pb-6 pb-3 pt-3 lg:pt-0 lg:pb-0 pl-0 pr-0 sm:px-8'}>
          <StrapiMedia classes={'mx-auto'} media={media} />
        </div>
        <div className={'flex-auto w-full lg:flex-1 lg:pt-0 pt-6 lg:px-0 px-8 sm:px-16 pl-0 pr-0 sm:px-8'}>
          <div className={'pb-8 xl:pb-6 text-justify 4 pr-0'}>
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
                'w-full max-w-xs xl:pb-0 grow-0 uppercase flex-auto text-sm w-60 xl:order-2 order-1 pt-4 xs:pt-0'
              }
            >
              <JustifiedText>
                  {justified_text}
              </JustifiedText>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}
