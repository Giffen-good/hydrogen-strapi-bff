import Cart from './Cart.client';
import Header from './Header.client';
import {Suspense} from 'react';
import HeaderFallback from './FallbackHeader';
import {useQuery} from '@shopify/hydrogen';

export default function getHeader({
  backgroundTransparency,
  useSpecialLayout,
  useNavigation,
}) {
  const {data} = useQuery(['use', 'asdfsadf'], async () => {
    const res = await fetch(
      `${import.meta.env.VITE_STRAPI}/api/header?populate=deep`,
      {
        headers: {
          accept: 'application/json',
        },
      },
    );
    return await res.json();
  });
  const navData = data.data.attributes;
  const logo = navData.alt_logo.data.attributes;
  return (
    <Suspense fallback={<HeaderFallback isHome={false} />}>
      <Header
        nav={navData.header_columns}
        logo={logo}
        useSpecialLayout={useSpecialLayout}
        backgroundTransparency={backgroundTransparency}
      />
      <Cart />
    </Suspense>
  );
}
