import StrapiMedia from '../StrapiMedia';
export default function Brands({brand_image}) {
  return (
    <section className={'flex justify-center gutter items-center pt-7 pb-0'}>
      {brand_image.data.map((img) => {
        return <StrapiMedia classes={'md:pl-8 md:pr-8 pl-4 pr-4'} media={img.attributes} />;
      })}
    </section>
  );
}
