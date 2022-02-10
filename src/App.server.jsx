import {DefaultRoutes} from '@shopify/hydrogen';
import {Suspense} from 'react';

import DefaultSeo from './components/DefaultSeo.server';
import NotFound from './components/NotFound.server';
import AppClient from './App.client';
import HeaderFallback from './components/FallbackHeader';
export default function App({log, pages, ...serverState}) {
  return (
    <Suspense fallback={<HeaderFallback />}>
      <AppClient helmetContext={serverState.helmetContext}>
        <DefaultSeo />
        <DefaultRoutes
          pages={pages}
          serverState={serverState}
          log={log}
          fallback={<NotFound />}
        />
      </AppClient>
    </Suspense>
  );
}
