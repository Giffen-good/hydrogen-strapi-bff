import StrapiMedia from '../StrapiMedia';
export default function ImageColumns({Images, settings}) {
  const imgs = Images.data;
  const {containerClasses, childClasses} = getClassesFromSettings(settings);
  return (
    <section
      className={`image-columns flex gutter gap-x-2 sm:flex-wrap md:flex-nowrap justify-center ${containerClasses}`}
    >
      {imgs.map((r, i) => {
        return (
          <StrapiMedia
            key={i}
            media={r.attributes}
            classes={`md:w-100 ${childClasses}`}
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
        containerClasses: '',
        childClasses: 'flex-1 object-cover h-full w-0 md:96 xl:h-128',
      };
    case 'equal_height':
      return {
        containerClasses: '',
        childClasses: 'basis-1/2 grow-1 shrink-1 object-cover h-full',
      };
    case 'center_aligned':
      return {
        containerClasses: 'items-center',
        childClasses: '',
      };
    case 'top_aligned':
      return {containerClasses: '', childClasses: ''};
    case 'bottom_aligned':
      return {containerClasses: 'items-baseline', childClasses: ''};
    default:
      return {containerClasses: '', childClasses: ''};
  }
}
