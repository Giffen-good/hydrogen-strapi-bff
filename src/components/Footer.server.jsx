import {useQuery} from '@shopify/hydrogen';
import FooterClient from './Footer.client';
import {Suspense} from 'react';
/**
 * A server component that specifies the content of the footer on the website
 */
export default function Footer() {
  const {data} = useQuery(['footer', 'footer_key'], async () => {
    const res = await fetch(
      `${import.meta.env.VITE_STRAPI}/api/footer?populate=deep`,
      {
        headers: {
          accept: 'application/json',
        },
      },
    );
    return await res.json();
  });

  const smMenu =
    data && data.data ? data.data.attributes.footer_social_media : null;

  const menuLeft =
    data && data.data ? data.data.attributes.footer_menu_item_left : null;
  const menuRight =
    data && data.data ? data.data.attributes.footer_menu_right : null;
  const time = new Date().toLocaleTimeString();
  return (
    <Suspense fallback={null}>
      <FooterClient
        time={time}
        menuLeft={menuLeft}
        menuRight={menuRight}
        smMenu={smMenu}
      />
    </Suspense>
  );
  // if (data?.data == null || data?.data.attributes == null) return;
  // const d = data.data?.attributes;
  // return (
  //   <footer
  //     role="contentinfo"
  //     className={
  //       'justify-between flex gutter text-xs uppercase font-semibold pb-8'
  //     }
  //   >
  //     <div>
  //       {d?.footer_menu_item_left.map((item, i) => {
  //         return (
  //           <Link className="block py-2" to={item.url} key={i}>
  //             {item.Label}
  //           </Link>
  //         );
  //       })}
  //       <Newsletter landingSection={false} />
  //     </div>
  //   </footer>
  // );
}
function has(object, key) {
  return object ? hasOwnProperty.call(object, key) : false;
}
