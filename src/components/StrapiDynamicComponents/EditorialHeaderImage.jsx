import StrapiMedia from '../StrapiMedia';
import Button from '../Button';
export default function EditorialHeaderImage({image, page_links_0}) {
  return (
    <section className="editorial-header-image flush relative">
      <StrapiMedia media={image.data.attributes} classes={'w-full'} />
      <div className="bg-opacity-30 bg-black absolute w-full h-full top-0 left-0"></div>
      {page_links_0.free_link ? (
        <div className={'gutter absolute bottom-12 right-0 text-right'}>
          <Button
            label={page_links_0.button_label}
            url={page_links_0.free_link}
            classes={'inline'}
          />
        </div>
      ) : (
        ''
      )}
    </section>
  );
}