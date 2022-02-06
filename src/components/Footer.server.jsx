import {Link, useQuery} from '@shopify/hydrogen';
import Newsletter from './StrapiDynamicComponents/Newsletter';
/**
 * A server component that specifies the content of the footer on the website
 */
export default function Footer() {
  const {data} = useQuery(['footer', 'key'], async () => {
    const res = await fetch(
      `${import.meta.env.VITE_STRAPI}/api/footer?populate=*`,
      {
        headers: {
          accept: 'application/json',
        },
      },
    );
    return await res.json();
  });
  const d = data.data?.attributes;
  return (
    <footer
      role="contentinfo"
      className={
        'justify-between flex gutter text-xs uppercase font-semibold pb-8'
      }
    >
      <div>
        {d?.footer_menu_item_left.map((item, i) => {
          return (
            <Link className="block py-2" to={item.url} key={i}>
              {item.Label}
            </Link>
          );
        })}
        <Newsletter landingSection={false} />
      </div>
    </footer>
  );
}
