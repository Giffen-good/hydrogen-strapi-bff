import LayoutStrapi from '../components/LayoutStrapi.server';
import {Suspense} from 'react';
import qs from 'qs';
export default function Index({params, request}) {
  const {pathname} = new URL(request.url);
  const query = qs.stringify(
    {
      populate: 'deep',
      publicationState: 'live',
      locale: ['en'],
    },
    {
      encodeValuesOnly: true, // prettify url
    },
  );
  return (
    <Suspense>
      <LayoutStrapi
        isSingleType={true}
        ApiSlug={'alphabet'}
        query={query}
        params={params}
        path={pathname}
        homepage={true}
      />
    </Suspense>
  );
}
