import {useState, useEffect} from 'react';
import {Link} from '@shopify/hydrogen/client';
import CartToggle from './CartToggle.client';
import HamburgerMenu from './HamburgerMenu.client';
import CloseIcon from './CloseIcon';
import {Fragment} from 'react';
import {FocusTrap} from '@headlessui/react';
import Burger from './Burger';
import StrapiMedia from './StrapiMedia';
/**
 * A client component that specifies the content of the header on the website
 */
export default function Header({nav, params, logo, headerSettings}) {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const OpenFocusTrap = isNavOpen ? FocusTrap : Fragment;
  const [scrollPosition, setScrollPosition] = useState(0);
  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };
  useEffect(() => {
    setScrollPosition(window.pageYOffset);
    window.addEventListener('scroll', handleScroll, {passive: true});

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  const ptClass = 'pt-5';
  return (
    <header className={'relative'} role="banner">
      <div
        className={` flex place-content-between fixed z-20   w-full  mx-auto ${
          isNavOpen ? '' : 'bg-opacity-95'
        }`}
      >
        {headerSettings.backgroundTransparency == 'transparent' ? (
          <div
            style={{
              opacity: `${Math.min(1, scrollPosition / 500)}`,
            }}
            className={' bg-white w-full h-full absolute'}
          ></div>
        ) : (
          <div className={' bg-white w-full h-full absolute'}></div>
        )}
        <div className="text-center flex no-mw gutter z-20 pb-3 w-full flex justify-between items-start ">
          <OpenFocusTrap>
            <button
              type="button"
              className={`flex justify-center items-center h-full ${
                isNavOpen ? 'w-8 ml-1' : 'w-12'
              }`}
              onClick={() => setIsNavOpen((isNavOpen) => !isNavOpen)}
            >
              {isNavOpen ? <CloseIcon /> : <Burger />}
            </button>
            {isNavOpen ? (
              <div className="absolute  top-20 w-full h-screen z-10 bg-gray-50 px-4 md:px-12 "></div>
            ) : null}
          </OpenFocusTrap>
          <div className={`logo ${ptClass} `}>
            <Link to="/">{logo ? <StrapiMedia media={logo} /> : ''}</Link>
          </div>
          {/*{headerSettings.useNavigation ? <HamburgerMenu nav={nav} /> : ''}*/}
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
