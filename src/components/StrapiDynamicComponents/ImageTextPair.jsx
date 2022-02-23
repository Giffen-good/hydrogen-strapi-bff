import StrapiMedia from '../StrapiMedia';
import Arrow from '../icons/Arrow';
import FreeLink from '../StrapiHelpers/FreeLink';
export default function ImageTextPair({image, box, cta_url}) {
  return (
    <section className="flex h-full flush pb-0 flex-wrap">
      <div className={'image-box lg:flex-1 relative w-full flex-auto'}>
        <StrapiMedia
          media={image.data?.attributes}
          classes={'w-full h-full top-0 left-0 object-cover absolute'}
        />
      </div>
      <FreeLink
        url={cta_url}
        classes={
          'text-box flex-auto lg:flex-1 block items-center flex-wrap text-center flex justify-center md:w-full'
        }
      >
        <div>
          <hgroup className={'pb-4 block w-full'}>
            <h2 className={'font-semibold  text-7xl pb-4'}>{box.header}</h2>
            <h3 className={'font-serif  text-6xl'}>{box.body}</h3>
          </hgroup>
          <div
            className={
              'cta font-semibold pt-4 text-xs w-full flex justify-center'
            }
          >
            <h5 className={'inline-block items-center flex'}>
              {box.cta}{' '}
              {box.has_arrow ? (
                <span className={'pl-4 text-lg'}>
                  <Arrow />
                </span>
              ) : (
                ''
              )}
            </h5>
          </div>
        </div>
      </FreeLink>
    </section>
  );
}
