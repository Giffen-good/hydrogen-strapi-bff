import {LocalizationProvider, useQuery} from '@shopify/hydrogen';
import {Suspense} from 'react';
import Header from './Header';
import Footer from './Footer.server';
import HeaderFallback from './FallbackHeader';
import FooterSettings from './Footer';
import {getGlobalPageSettings} from './StrapiHelpers/util';
/**
 * A server component that defines a structure and organization of a page that can be used in different parts of the Hydrogen app
 */

export default function LayoutShopify({children, headerSettings}) {
  return (
    <LocalizationProvider>
      <div className="absolute top-0 left-0 font-sans">
        <a
          href="#mainContent"
          className="p-4 focus:block sr-only focus:not-sr-only"
        >
          Skip to content
        </a>
      </div>
      {/* TODO: Find out why Suspense needs to be here to prevent hydration errors. */}
      <Suspense fallback={<HeaderFallback />}>
        <Header
          backgroundTransparency={headerSettings.backgroundTransparency}
          useSpecialLayout={headerSettings.useSpecialLayout}
          useNavigation={headerSettings.useNavigation}
        />
      </Suspense>
      <main role="main" id="mainContent" className={`relative `}>
        <div className="flex flex-col max-w-screen text-black font-sans">
          <Suspense fallback={null}>{children}</Suspense>
        </div>
      </main>
      <Suspense fallback={null}>
        <FooterSettings>
          <Footer />
        </FooterSettings>
      </Suspense>
    </LocalizationProvider>
  );
}
