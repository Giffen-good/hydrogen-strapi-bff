import StrapiMedia from '../StrapiMedia';
import {getAttributes} from '../StrapiHelpers/componentImports';
export default function BannerImageWithLink({
  banner,
  overlay_opacity,
  page_links_0,
}) {
  const media = getAttributes(banner);
  if (!media) return;
  return (
    <section key={'1'} className="flush banner-image">
      <StrapiMedia media={media} classes={'w-full object-cover'} />
    </section>
  );
}
