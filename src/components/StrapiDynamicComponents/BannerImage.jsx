import StrapiMedia from '../StrapiMedia';
export default function BannerImage({banner}) {
  const media = banner.data.attributes;
  return (
    <section key={'1'} className="flush banner-image">
      <StrapiMedia media={media} classes={'w-full object-cover'} />
    </section>
  );
}
