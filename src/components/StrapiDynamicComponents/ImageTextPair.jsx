import StrapiMedia from '../StrapiMedia';
import Arrow from '../icons/Arrow';
import FreeLink from '../StrapiHelpers/FreeLink';
import RichTextBody from "./RichTextBody";

export default function ImageTextPair({image, box, cta_url, has_padding, text_first}) {
  return (
    <section className={`flex h-full  flex-wrap ${has_padding ? 'gutter' : 'flush pb-0 '} ${text_first ? 'text-is-left-aligned' : ''}`}>
      <div className={'image-box lg:flex-1 relative w-full flex-auto'}>
        <StrapiMedia
          media={image.data?.attributes}
          classes={'w-full h-full top-0 left-0 object-cover lg:absolute'}
        />
      </div>
      <FreeLink
        url={cta_url}
        classes={
          'text-box flex-auto lg:flex-1 block items-center flex-wrap text-center flex justify-center md:w-full'
        }
      >
        {box ? 
          <div>
            <hgroup className={'pb-4 block w-full'}>
              <h2 className={'font-semibold  text-7xl pb-4'}>{box.header}</h2>
              <h3 className={'font-serif  text-6xl'}>{box.body}</h3>
            </hgroup>
            {box.paragraph ? (
              <div className={'pb-3'}>
                <RichTextBody  noPadding={true}>
                  {box.paragraph}
                </RichTextBody>
              </div>
              )  : ''}
            <div
              className={
                'cta font-semibold pt-5 text-xs w-full flex justify-center'
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
        : '' }
      </FreeLink>
    </section>
  );
}
