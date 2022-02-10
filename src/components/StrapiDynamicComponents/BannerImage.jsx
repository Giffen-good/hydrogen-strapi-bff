import StrapiMedia from '../StrapiMedia';
import {getAttributes} from './componentImports';
export default function BannerImage({banner}) {
  const media = getAttributes(banner);
  if (!media) return;
  return (
    <section key={'1'} className="flush banner-image">
      <StrapiMedia media={media} classes={'w-full object-cover'} />
    </section>
  );
}
