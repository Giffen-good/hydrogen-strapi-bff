import {LocalizationProvider} from '@shopify/hydrogen';

import Header from './Header.server';
import {Suspense} from 'react';

/**
 * A server component that defines a structure and organization of a page that can be used in different parts of the Hydrogen app
 */
export default function Layout({children, strapiData}) {
  const {background_color} = strapiData
    ? strapiData
    : {background_color: '#fff'};
  const {background_transparency, logo} = strapiData
    ? strapiData.header_type
    : {background_transparency: 'opaque', logo: 'initials'};

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
      <div
        className="min-h-screen max-w-screen text-black font-sans"
        style={{background: background_color}}
      >
        {/* TODO: Find out why Suspense needs to be here to prevent hydration errors. */}
        <Suspense fallback={null}>
          <Header
            minimal={true}
            logoType={logo}
            backgroundTransparency={background_transparency}
          />
        </Suspense>
        <main
          role="main"
          id="mainContent"
          className={`relative ${
            background_transparency === 'transparent'
              ? 'flush'
              : 'header-offset'
          }`}
        >
          <div className="mx-auto">{children}</div>
        </main>
      </div>
    </LocalizationProvider>
  );
}
