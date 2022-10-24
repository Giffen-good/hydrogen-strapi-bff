import renderHydrogen from '@shopify/hydrogen/entry-server';
import {
  Router,
  Route,
  FileRoutes,
  ShopifyProvider,
  PerformanceMetrics,
  PerformanceMetricsDebug,
} from '@shopify/hydrogen';
import {Suspense} from 'react';
import DefaultSeo from './components/DefaultSeo.server';
import NotFound from './components/NotFound.server';
import LoadingFallback from './components/LoadingFallback';
import ServerCartProvider from './components/ServerCartProvider.server';

function App({request}) {
  const pathname = new URL(request.normalizedUrl).pathname;
  const localeMatch = /^\/([a-z]{2})(\/|$)/i.exec(pathname);
  const countryCode = localeMatch ? localeMatch[1] : undefined;

  return (
    <Suspense fallback={<LoadingFallback />}>
      <ShopifyProvider countryCode={countryCode}>
        <ServerCartProvider>
          <DefaultSeo />
          <Router>
            <FileRoutes />
            <Route path="*" page={<NotFound />} />
          </Router>
        </ServerCartProvider>
        <PerformanceMetrics />
        {import.meta.env.DEV && <PerformanceMetricsDebug />}
      </ShopifyProvider>
    </Suspense>
  );
}

export default renderHydrogen(App);
