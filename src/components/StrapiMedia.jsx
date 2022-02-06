export default function StrapiMedia({media, classes}) {
  const customCaption = media.name !== media.caption ? media.caption : '';
  const sUrl = import.meta.env.VITE_STRAPI;
  const mimeType = media.mime.split('/')[0];
  const el =
    mimeType === 'video' ? (
      <StrapiVideo />
    ) : (
      <StrapiImage
        image={media}
        sUrl={sUrl}
        classes={classes}
        customCaption={customCaption}
      />
    );
  return el;
}
function SrcsetTags({f, sUrl}) {
  if (!f) return;
  return (
    <>
      {Object.keys(f).map((imgFormat, i) => {
        return (
          <source
            key={i}
            srcSet={`${sUrl}${f[imgFormat].url}`}
            media={`(max-width: ${f[imgFormat].width}px)`}
          />
        );
      })}
    </>
  );
}
function StrapiVideo() {
  console.log('support for Self-hosted videos NOT enabled');
  return;
}
function StrapiImage({sUrl, image, customCaption, classes}) {
  let srcset = '';
  if (image.formats) srcset = <SrcsetTags f={image.formats} sUrl={sUrl} />;
  return (
    <picture>
      {srcset}
      <img
        src={`${sUrl}${image.url}`}
        alt={image.alternativeText}
        title={customCaption}
        className={classes}
      />
    </picture>
  );
}
