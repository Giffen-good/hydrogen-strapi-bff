import Cart from './Cart.client';
import Header from './Header.client';
import {Suspense} from 'react';
import HeaderFallback from './FallbackHeader';
import {useQuery} from '@shopify/hydrogen';
export default function getHeaderServer({params, customSettings}) {
  const {data} = useQuery(['use', 'asdfsadf'], async () => {
    const res = await fetch(
      `${import.meta.env.VITE_STRAPI}/api/header?populate=*`,
      {
        headers: {
          accept: 'application/json',
        },
      },
    );
    return await res.json();
  });
  const {logo, headerSettings, navItems} = getHeaderSettings(
    data,
    params,
    customSettings,
  );
  return (
    <Suspense fallback={<HeaderFallback isHome={false} />}>
      <Header nav={navItems} logo={logo} headerSettings={headerSettings} />
      <Cart />
    </Suspense>
  );
}

function getHeaderSettings(nav, params, customSettings) {
  let fallback = {
    headerSettings: {
      backgroundTransparency: false,
      logoType: 'alt_logo',
      useNavigation: true,
      useSpecialLayout: false,
    },
    logo: null,
    navItems: null,
  };
  let res = customSettings ? customSettings : fallback;
  if (
    params &&
    has(params, 'attributes') &&
    has(params.attributes, 'header_type')
  ) {
    const h = params.attributes.header_type;
    res.headerSettings = {
      backgroundTransparency: h.background_transparency,
      logoType: h.logo,
      useNavigation: h.use_navigation,
      useSpecialLayout: h.use_special_layout,
    };
  }
  if (nav && has(nav, 'data') && has(nav.data, 'attributes')) {
    const navData = nav.data.attributes;
    let logo = navData.alt_logo.data.attributes;
    if (res.headerSettings.useSpecialLayout) {
      logo = navData.homepage_logo.data.attributes;
    } else if (res.headerSettings.logoType == 'logo') {
      logo = navData.logo.data.attributes;
    }
    res.navItems = navData.header_coloumns;
    res.logo = logo;
  }
  return res;
}
function has(object, key) {
  return object ? hasOwnProperty.call(object, key) : false;
}
function getLogo(nav) {
  if (nav && has(nav, 'data') && has(nav.data, 'attributes')) {
    const navData = nav.data.attributes;
    return navData.alt_logo.data.attributes;
  }
}
