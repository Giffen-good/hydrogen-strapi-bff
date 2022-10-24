import Cart from './Cart.client';
import Header from './Header.client';
import {Suspense} from 'react';
import HeaderFallback from './FallbackHeader';
import {useQuery} from '@shopify/hydrogen';
import Logo from './Logo';

export default function GetHeader({
  backgroundTransparency,
  useSpecialLayout,
  useNavigation,
  flush,
}) {
  const {data} = useQuery(['use', 'header_strapi_components'], async () => {
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
  const cartIcon = navData.cart_icon?.data?.attributes;
  return (
    <Suspense fallback={<HeaderFallback isHome={false} />}>
      {useNavigation ? (
        <Header
          cartIcon={cartIcon}
          nav={navData.header_columns}
          logo={logo}
          useSpecialLayout={useSpecialLayout}
          backgroundTransparency={backgroundTransparency}
          flush={flush}
          useNavigation={useNavigation}
        />
      ) : (
        <NoNavHeader />
      )}
      <Cart />
    </Suspense>
  );
}
const NoNavHeader = () => {
  return (
    <div
      className={
        ' flex place-content-between absolute z-20  w-full  mx-auto noNavHeader'
      }
    >
      <div
        className={
          'text-center flex no-mw gutter z-20  pt-2 w-full flex justify-center items-center head-wrap alt-logo'
        }
      >
        <Logo />
      </div>
    </div>
  );
};
