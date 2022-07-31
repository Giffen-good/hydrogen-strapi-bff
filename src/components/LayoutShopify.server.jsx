import {LocalizationProvider, useQuery} from '@shopify/hydrogen';
import {Suspense} from 'react';
import Header from './Header';
import Footer from './Footer.server';
import HeaderFallback from './FallbackHeader';
import FooterSettings from './Footer';
import {getGlobalPageSettings} from './StrapiHelpers/util';
import TransitionLayout from "./TransitionLayout.client";

/**
 * A server component that defines a structure and organization of a page that can be used in different parts of the Hydrogen app
 */

export default function LayoutShopify({children, headerSettings}) {
  console.log(headerSettings)
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
          flush={true}
          backgroundTransparency={headerSettings.backgroundTransparency}
          useSpecialLayout={headerSettings.useSpecialLayout}
          useNavigation={headerSettings.useNavigation}
        />
      </Suspense>
      <TransitionLayout classes={'main-root'}>
        <main role="main" id="mainContent" className={`relative main-body-area `}>
          <div className="flex flex-col max-w-screen text-black font-sans">
            <Suspense fallback={null}>{children}</Suspense>
          </div>
        </main>
        <Suspense fallback={null}>
          <FooterSettings>
            <Footer />
          </FooterSettings>
        </Suspense>
      </TransitionLayout>
    </LocalizationProvider>
  );
}
