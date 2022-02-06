import {useState, useEffect} from 'react';
import {Link} from '@shopify/hydrogen/client';
import CartToggle from './CartToggle.client';
import HamburgerMenu from './HamburgerMenu.client';
import CloseIcon from './CloseIcon';
import {Fragment} from 'react';
import {FocusTrap} from '@headlessui/react';
import Burger from './Burger';

/**
 * A client component that specifies the content of the header on the website
 */
export default function Header({logo, backgroundTransparency, nav}) {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const OpenFocusTrap = isNavOpen ? FocusTrap : Fragment;

  const [scrollPosition, setScrollPosition] = useState(0);
  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };
  const ptClass = 'pt-5';
  useEffect(() => {
    setScrollPosition(window.pageYOffset);
    window.addEventListener('scroll', handleScroll, {passive: true});

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={'relative'} role="banner">
      <div
        className={` flex place-content-between fixed z-20   w-full  mx-auto ${
          isNavOpen ? '' : 'bg-opacity-95'
        }`}
      >
        <div
          style={{
            opacity: backgroundTransparency
              ? `${Math.min(1, scrollPosition / 500)}`
              : '1',
          }}
          className={' bg-white w-full h-full absolute'}
        ></div>
        <div className="text-center flex gutter z-20 pb-3 w-full flex justify-between items-start ">
          <OpenFocusTrap>
            <button
              type="button"
              className={`flex justify-center items-center h-full ${
                isNavOpen ? 'w-8 ml-1' : 'w-12'
              }`}
              // onClick={() => setIsNavOpen((isNavOpen) => !isNavOpen)}
            >
              {isNavOpen ? <CloseIcon /> : <Burger />}
            </button>
            {isNavOpen ? (
              <div className="absolute  top-20 w-full h-screen z-10 bg-gray-50 px-4 md:px-12 "></div>
            ) : null}
          </OpenFocusTrap>
          <div className={`logo ${ptClass}`}>
            <Link to="/">
              <img src={`${import.meta.env.VITE_STRAPI}${logo}`} />
            </Link>
          </div>

          <HamburgerMenu nav={nav} />
          <div className={ptClass}>
            <CartToggle
              handleClick={() => {
                if (isNavOpen) setIsNavOpen(false);
              }}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
// const testHead = () => {
//   const {data} = useQuery(['use', 'asdfsadf'], async () => {
//     const res = await fetch(
//       `${import.meta.env.VITE_STRAPI}/api/header?populate=*`,
//       {
//         headers: {
//           accept: 'application/json',
//         },
//       },
//     );
//     return await res.json();
//   });
//   return (
//     <div>
//       {typeof data !== 'undefined' && data.length
//         ? data.statusText
//         : 'NOT DICE'}
//     </div>
//   );
// };
