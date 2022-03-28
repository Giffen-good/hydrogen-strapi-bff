import ArchiveStrapi from '../components/ArchiveStrapi.server';
import qs from 'qs';
export default function Index({params, request}) {
  const {pathname} = new URL(request.url);
  const {handle} = params;
  const query = qs.stringify(
    {
      populate: 'deep',
      filters: {
        slug: {
          $eq: handle,
        },
      },
      publicationState: 'live',
      locale: ['en'],
    },
    {
      encodeValuesOnly: true, // prettify url
    },
  );
  return (
    <ArchiveStrapi
      isSingleType={false}
      ApiSlug={'stories'}
      query={query}
      params={params}
      path={pathname}
      homepage={false}
      hasDynamicZone={false}
    />
  );
}
