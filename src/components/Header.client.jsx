import {useState, useEffect} from 'react';
import {Link} from '@shopify/hydrogen/client';
import CartToggle from './CartToggle.client';
import Navigation from './Navigation.client';
import CloseIcon from './CloseIcon';
import {Fragment} from 'react';
import {FocusTrap} from '@headlessui/react';
import Burger from './Burger';
import StrapiMedia from './StrapiMedia';
import Logo from './Logo';
/**
 * A client component that specifies the content of the header on the website
 */
export default function Header({
                                 nav,
                                 logo,
                                 logoType,
                                 useSpecialLayout,
                                 flush,
                                cartIcon,
                                 backgroundTransparency,
                               }) {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const OpenFocusTrap = isNavOpen ? FocusTrap : Fragment;
  const [scrollPosition, setScrollPosition] = useState(null);
  let initialScrollPosition = true;
  const [pageInitalized, setPageInitialized] = useState(false);
  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };


  useEffect(() => {
    setScrollPosition(window.pageYOffset);
    initialScrollPosition = window.pageYOffset;
    setPageInitialized(() => true);
    window.addEventListener('scroll', handleScroll, {passive: true});
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <header
      className={`relative ${
        useSpecialLayout && scrollPosition < 100 ? 'invert-icons' : ''
      } ${
        useSpecialLayout && !scrollPosition && pageInitalized && !isNavOpen
          ? 'special-layout-initialized'
          : ''
      } ${isNavOpen ? 'nav-is-open' : ''}`}
      role="banner"
    >
      <div
        className={` flex place-content-between fixed z-20  w-full  mx-auto`}
      >
        <Background
          backgroundTransparency={backgroundTransparency}
          useSpecialLayout={useSpecialLayout}
          scrollPosition={scrollPosition}
          flush={flush}
        />
        <div className="text-center flex no-mw gutter z-20 py-5 pt-6 w-full flex justify-between items-center head-wrap">
          <div className={'flex flex-1 justify-start items-center h-full '}>
            <button
              type="button"
              className={`flex  w-12  burger`}
              onClick={() => setIsNavOpen((isNavOpen) => !isNavOpen)}
            >
              {isNavOpen ? (
                <div className={'pr-3 close-icon'}>
                  <CloseIcon />
                </div>
              ) : (
                <Burger />
              )}
            </button>
          </div>
          <CenterSection
            setIsNavOpen={setIsNavOpen}
            useSpecialLayout={useSpecialLayout}
            logo={logo}
            logoType={logoType}
            scrollPosition={scrollPosition}
            pageInitialized={pageInitalized}
            nav={nav}
          />
          <div className={` flex-1 justify-end text-right `}>
            <CartToggle
              icon={cartIcon}
              handleClick={() => {
                if (isNavOpen) setIsNavOpen(false);
              }}
            />
          </div>
        </div>
      </div>
      <Navigation nav={nav} setIsNavOpen={setIsNavOpen} />
    </header>
  );
}
const CenterSection = ({
                         useSpecialLayout,
                         logo,
                         scrollPosition,
                         pageInitialized,
                         setIsNavOpen,
                         nav,
                       }) => {
  let el;
  if (useSpecialLayout) {
    el = (
      <div
        className={`special-header ${
          scrollPosition == 0 ? '' : 'disappear'
        }  flex-1 ${scrollPosition > 0 ? 'disappear' : ''}`}
      >
        <div className={`relative `}>
          <Link to="/" className={`logo full-logo mt-2`}>
            <div className={'mx-auto absolute inset-x-0 top-0 text-center'}>
              <Logo />
            </div>
          </Link>
          <Link
            to="/"
            className={`alt-logo ${pageInitialized ? '' : 'hidden'}`}
          >
            {logo ? <StrapiMedia media={logo} classes={'mx-auto'} /> : ''}
          </Link>
        </div>
        <Navigation setIsNavOpen={setIsNavOpen} special={true} nav={nav} />
      </div>
    );
  } else {
    el = (
      <div className={`logo flex-1  `}>
        <Link to="/">
          {logo ? <StrapiMedia media={logo} classes={'mx-auto'} /> : ''}
        </Link>
      </div>
    );
  }
  return el;
};
const Background = ({
    scrollPosition,
    backgroundTransparency,
    useSpecialLayout,
    flush
  }) => {
      return (
        <>
          <div
            className={`topbar-overlay bg-white w-full h-full absolute ${backgroundTransparency ? 'transparent-bg' : ''} ${scrollPosition > 100 ? 'show-header' : ''}`}
          ></div>
          <NavBackground />
        </>
      )
};
const NavBackground = () => {
  return (
    <div
      className={
        'header-overlay absolute bg-yellow-bff top-0 left-0 right-0 w-full'
      }
    ></div>
  );
};
// const transparentHeaderAnimation = (scrollPosition) => {
//   return {
//     // transform: `translateY(${Math.min(
//     //   0,
//     //   -100 + 100 * Math.min(1, scrollPosition / 400),
//     // )}px)`,
//     opacity: `${Math.min(1, scrollPosition / 100)}`,
//     filter: `blur(${Math.max(
//       0,
//       15 - 15 * Math.min(1, scrollPosition / 100),
//     )}px)`,
//   };
// };
