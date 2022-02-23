import StrapiMedia from '../StrapiMedia';
import Button from '../Button';
import {getAttributes} from '../StrapiHelpers/componentImports';
export default function EditorialHeaderImage({
  image,
  page_links_0,
  overlay_opacity,
  mobile_fallback,
}) {
  const mobileMedia = getAttributes(mobile_fallback);
  const media = getAttributes(image);
  return (
    <section className="editorial-header-image flush relative pb-0">
      <StrapiMedia
        media={media}
        classes={`w-full ${mobileMedia ? 'hidden' : ''} md:block`}
      />
      {mobileMedia ? (
        <StrapiMedia media={mobileMedia} classes={'w-full md:hidden'} />
      ) : (
        ''
      )}
      <div
        style={{opacity: `${overlay_opacity / 100}`}}
        className={`bg-black absolute w-full h-full top-0 left-0`}
      ></div>
      {page_links_0 && page_links_0.free_link ? (
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
