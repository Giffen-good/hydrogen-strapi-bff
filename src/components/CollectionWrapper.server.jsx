import {Suspense} from 'react';
export default function CollectionWrapper({children}) {
  return (
    <div className="grid gutter narrow-gutter  grid-cols-2  md:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-8 mb-16">
      <Suspense fallback={null}>{children}</Suspense>
    </div>
  );
}
