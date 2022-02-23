import StrapiMedia from '../StrapiMedia';
import {sanityCheckToAttributes} from '../StrapiHelpers/util';
import RichTextBody from './RichTextBody';
export default function ThreeColumnBanner({body, image_1, image_2}) {
  return (
    <section className={'flex flush pb-0'}>
      <div className={'flex-1'}>
        <StrapiMedia
          classes={'object-cover h-full w-full'}
          media={image_1?.data?.attributes}
        />
      </div>
      <div className={'flex-1 py-12'}>
        <RichTextBody>{body}</RichTextBody>
      </div>
      <div className={'flex-1'}>
        <StrapiMedia
          classes={'object-cover h-full w-full'}
          media={image_2?.data?.attributes}
        />
      </div>
    </section>
  );
}
