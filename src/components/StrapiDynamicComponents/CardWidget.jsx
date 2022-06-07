import RichTextBody from "./RichTextBody";
import StrapiMedia from "../StrapiMedia";
import AspectRatios from '../StrapiHelpers/AspectRatios.module.css';
import FreeLink from "../StrapiHelpers/FreeLink";
const CardWidget = ({
  card_style,
  image_aspect_ratio,
  content_card,
  fluid_width,
}) => {
  return (
    <section
      className={`CardWidget flex lg:flex-nowrap flex-wrap ${
        fluid_width ? '' : 'gutter gap-4'
      }`}
    >
      {content_card.map((c, n) => (
        <Wrapper key={n} link={c.link}>
          <ResponsiveImage media={c.image} aspect={image_aspect_ratio} />
          <TextSection c={c} style={card_style} />
        </Wrapper>
      ))}
    </section>
  );
}
const Wrapper = ({children, link}) => {
  if (link) {
    return <FreeLink url={link} classes={'lg:flex-1 grow sm:basis-5/12 md:w-auto w-full'}>{children}</FreeLink>;
  } else {
    return <article className={'lg:flex-1 grow sm:basis-5/12 md:w-auto w-full '}>{children}</article>;
  }
}

const ResponsiveImage = ({media, aspect}) => (
  <div className={`relative w-full ${AspectRatios[aspect]}`}>
    <StrapiMedia
      media={media.data.attributes}
      classes={`absolute top-0 left-0 w-full h-full object-cover`}
    />
  </div>
);

const TextSection = ({c, style}) => {
  if (style === 'landscape') return <TextStyleOne c={c} />
  if (style === 'portrait_centered') return <TextStyleTwo c={c} />
  if (style === 'portrait_left_aligned') return <TextStyleThree c={c} />
}
const TextStyleOne = ({c}) => (
   <div>
     {c.heading ? <h2 className={'uppercase text-2xl font-semibold pb-0.5 pt-2'}>{c.heading}</h2> : ''}
      {c.body ? (
        <div className={'line-clamp-5 text-xs'}>
          <RichTextBody noGutter={true} noPadding={true}>
            {c.body}
          </RichTextBody>
        </div>
      ) : (
        ''
      )}
    {c.sub_heading ? <h3 className={'uppercase pt-2 font-semibold text-xs'}>{c.sub_heading}</h3> : ''}
  </div>
)

const TextStyleTwo = ({c}) => (
  <div className={'text-center'}>
    {c.heading ? <h2 className={'uppercase text-2xl font-semibold pb-2 pt-4'}>{c.heading}</h2> : ''}
    {c.body ? (
      <div className={'line-clamp-5 text-xs'}>
        <RichTextBody noGutter={true} noPadding={true}>
          {c.body}
        </RichTextBody>
      </div>
    ) : (
      ''
    )}
    {c.sub_heading ? <h3 className={'uppercase pt-2 font-semibold text-xs'}>{c.sub_heading}</h3> : ''}
  </div>
)
const TextStyleThree = ({c}) => (
  <div>
    {c.heading ? <h2 className={'uppercase text-3xl font-serif pt-3'}>{c.heading}</h2> : ''}
    {c.body ? (
      <div className={' pb-1.5'}>
        <RichTextBody noGutter={true} noPadding={true}>
          {c.body}
        </RichTextBody>
      </div>
    ) : (
      ''
    )}
    {c.sub_heading ? <h3 className={'uppercase  text-xs font-semibold'}>{c.sub_heading}</h3> : ''}
  </div>
)

export default CardWidget;