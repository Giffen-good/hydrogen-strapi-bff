import StrapiMedia from '../StrapiMedia';
export default function ImageTextPair({image, background_color, box}) {
  return (
    <section className="flex" style={{backgroundColor: background_color}}>
      <div className={'flex-1 relative'}>
        <StrapiMedia
          media={image.data?.attributes}
          classes={'w-full h-full top-0 left-0 object-cover absolute'}
        />
      </div>
      <div className={'flex-1 items-center flex text-center justify-center'}>
        <hgroup className={'pb-3'}>
          <h3 className={'font-serif pb-2 text-2xl'}>{box.body}</h3>
          <h2 className={'font-semibold pb-2'}>{box.header}</h2>
        </hgroup>
        <div className={'cta font-semibold text-xs flex justify-center'}>
          <h5 className={'inline-block'}>{box.cta}</h5>
        </div>
      </div>
    </section>
  );
}
