import StrapiServer from '../../components/Strapi.server';
import {Suspense} from 'react';
export default function Index({params, request}) {
  return (
    <Suspense>
      <StrapiServer request={request} params={params} />
    </Suspense>
  );
}
