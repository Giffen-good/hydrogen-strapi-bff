import HeaderClient from './Header.client';
import {Suspense} from 'react';
import {useQuery} from '@shopify/hydrogen';
export default function Header({
  logoType,
  backgroundTransparency,
  use_navigation,
}) {
  const {data} = useQuery(['header', 'key'], async () => {
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
  const d = data.data?.attributes;
  let logo_url = d?.alt_logo.data.attributes.url;
  if (logoType == 'logo') {
    logo_url = d.logo.data.attributes.url;
  } else if (logoType == 'inverted_logo') {
    logo_url = d.inverted_logo.data.attributes.url;
  }
  let Header;
  if (use_navigation) {
    Header = (
      <HeaderClient
        logo={logo_url}
        nav={d?.header_columns}
        backgroundTransparency={backgroundTransparency}
      />
    );
  } else {
    Header = (
      <div className={'flex justify-center py-5'}>
        <img src={`${import.meta.env.VITE_STRAPI}${logo_url}`} />
      </div>
    );
  }
  return <Suspense fallback={null}>{Header}</Suspense>;
}
function HeaderFallback() {
  return <div></div>;
}
