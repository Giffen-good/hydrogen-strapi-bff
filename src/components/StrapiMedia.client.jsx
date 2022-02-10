export default function StrapiMedia({media, classes}) {
  if (!media) return;
  const customCaption = media.name !== media.caption ? media.caption : '';
  const mimeType = media.mime.split('/')[0];
  const el =
    mimeType === 'video' ? (
      <StrapiVideo />
    ) : (
      <StrapiImage
        image={media}
        classes={classes}
        customCaption={customCaption}
      />
    );
  return el;
}
function SrcsetTags({f}) {
  if (!f) return;
  return (
    <>
      {Object.keys(f).map((imgFormat, i) => {
        return (
          <source
            key={i}
            srcSet={f[imgFormat].url}
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
function StrapiImage({image, customCaption, classes}) {
  let srcset = '';
  if (image.formats) srcset = <SrcsetTags f={image.formats} />;
  return (
    <picture>
      {srcset}
      <img
        src={image.url}
        alt={image.alternativeText}
        title={customCaption}
        className={classes}
      />
    </picture>
  );
}
