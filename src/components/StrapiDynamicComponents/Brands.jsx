import StrapiMedia from '../StrapiMedia';
export default function Brands({brand_image}) {
  return (
    <section className={'flex justify-center gutter pt-7'}>
      {brand_image.data.map((img) => {
        return <StrapiMedia classes={'pl-8 pr-8'} media={img.attributes} />;
      })}
    </section>
  );
}
