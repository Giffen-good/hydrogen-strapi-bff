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
  const ptClass = 'mt-5';
  return (
    <header
      className={`relative ${
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
          transparentHeaderAnimation={transparentHeaderAnimation}
        />
        <div className="text-center flex no-mw gutter z-20 pb-3 w-full flex justify-between items-start ">
          <div className={'flex flex-1 justify-start items-center h-full '}>
            <button
              type="button"
              className={`flex  w-12`}
              onClick={() => setIsNavOpen((isNavOpen) => !isNavOpen)}
            >
              {isNavOpen ? (
                <div className={'ml-1.5'}>
                  <CloseIcon />
                </div>
              ) : (
                <Burger />
              )}
            </button>
          </div>
          <CenterSection
            useSpecialLayout={useSpecialLayout}
            ptClass={ptClass}
            logo={logo}
            logoType={logoType}
            scrollPosition={scrollPosition}
            pageInitialized={pageInitalized}
            nav={nav}
          />
          <div className={`${ptClass} flex-1 justify-end text-right`}>
            <CartToggle
              handleClick={() => {
                if (isNavOpen) setIsNavOpen(false);
              }}
            />
          </div>
        </div>
      </div>
      <Navigation nav={nav} isNavOpen={isNavOpen} />
    </header>
  );
}
const CenterSection = ({
  useSpecialLayout,
  ptClass,
  logo,
  scrollPosition,
  pageInitialized,
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
        <div className={`relative ${ptClass}`}>
          <Link to="/" className={`logo `}>
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
        <Navigation hasSubNav={false} nav={nav} />
      </div>
    );
  } else {
    el = (
      <div className={`logo flex-1 ${ptClass} `}>
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
  transparentHeaderAnimation,
}) => {
  let el;
  if (useSpecialLayout || backgroundTransparency) {
    el = (
      <>
        <div
          style={{...transparentHeaderAnimation(scrollPosition)}}
          className={'topbar-overlay bg-white w-full h-full absolute'}
        ></div>
        <NavBackground />
      </>
    );
  } else {
    el = (
      <>
        <div className={'topbar-overlay bg-white w-full h-full absolute'}></div>
        <NavBackground />
      </>
    );
  }

  return el;
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
const transparentHeaderAnimation = (scrollPosition) => {
  return {
    // transform: `translateY(${Math.min(
    //   0,
    //   -100 + 100 * Math.min(1, scrollPosition / 400),
    // )}px)`,
    opacity: `${Math.min(1, scrollPosition / 100)}`,
    filter: `blur(${Math.max(
      0,
      15 - 15 * Math.min(1, scrollPosition / 100),
    )}px)`,
  };
};
