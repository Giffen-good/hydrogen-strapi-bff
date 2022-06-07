import Burger from './Burger';
import {Link} from '@shopify/hydrogen/client';
import HamburgerMenu from './HamburgerMenu.client';
import CartToggle from './CartToggle.client';
import Logo from './Logo';
import LogoInitials from './LogoInitials';
export default function HeaderFallback({isHome}) {
  <header className={'relative'} role="banner">
    <div
      className={` flex place-content-between fixed z-20   w-full  mx-auto 
      `}
    >
      <div className={' bg-white w-full h-full absolute'}></div>
      <div className="text-center flex gutter z-20 pb-3 w-full flex justify-between items-start ">
        <button>
          <Burger />
        </button>

        <div className={`logo pt-5 `}>
          <Link to="/">{isHome ? <Logo /> : <LogoInitials />}</Link>
        </div>

        <HamburgerMenu nav={null} />
        <div className="pt-5">
          <CartToggle />
        </div>
      </div>
    </div>
  </header>;
}
