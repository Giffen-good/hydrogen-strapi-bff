import StrapiMedia from '../StrapiMedia';
export default function ImageColumns({Images, settings}) {
  const imgs = Images.data;
  if (!imgs) return;
  const {containerClasses, childClasses} = getClassesFromSettings(settings);
  return (
    <section
      className={`image-columns flex   flex-wrap md:flex-nowrap justify-center ${containerClasses}`}
    >
      {imgs.map((r, i) => {
        return (
          <StrapiMedia
            key={i}
            media={r.attributes}
            classes={`w-100 pb-4 lg:pb-0 lg:w-auto ${childClasses}`}
          />
        );
      })}
    </section>
  );
}
function getClassesFromSettings(s) {
  switch (s) {
    case 'equal_size':
      return {
        containerClasses: 'gap-x-2 gutter',
        childClasses: 'flex-1 object-cover h-auto lg:h-full lg:w-0 md:96 xl:h-128',
      };
    case 'full_width':
      return {
        containerClasses: 'gap-x-0',
        childClasses: 'flex-1 object-cover h-auto lg:h-full lg:w-0 md:96 xl:h-128',
      };
    case 'equal_height':
      return {
        containerClasses: 'gap-x-2 gutter',
        childClasses: 'basis-1/2 grow-1 shrink-1 object-cover h-auto md:h-full ',
      };
    case 'center_aligned':
      return {
        containerClasses: 'items-center gap-x-2 gutter',
        childClasses: '',
      };
    case 'top_aligned':
      return {containerClasses: 'gap-x-2 gutter', childClasses: ''};
    case 'bottom_aligned':
      return {
        containerClasses: 'items-baseline gap-x-2 gutter',
        childClasses: '',
      };
    default:
      return {containerClasses: 'gap-x-2 gutter', childClasses: ''};
  }
}
