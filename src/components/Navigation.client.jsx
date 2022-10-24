import FreeLink from './StrapiHelpers/FreeLink';
import {useState} from 'react';

export default function Navigation({nav, special, setIsNavOpen}) {
  const [openNavItem, setOpenNavItem] = useState(null);
  return (
    <>
      <nav
        className={
          'top-level-nav text-left uppercase text-xs md:flex justify-center z-20 pl-24 hidden '
        }
      >
        {nav.map((item, idx) => {
          return (
            <div key={idx} className={'nav-column flex-col '}>
              <span
                onClick={() => {
                  setIsNavOpen(false);
                }}
              >
                <FreeLink
                  classes={'top-nav-item font-semibold'}
                  url={item.top_level_url}
                >
                  {item.top_level_menu_item}
                </FreeLink>
              </span>
              <div className={'subnav'}>
                <SubNav
                  setIsNavOpen={setIsNavOpen}
                  s={item.sub_menu_item}
                  classes={`block sub-nav-item py-4 `}
                />
              </div>
            </div>
          );
        })}
      </nav>
      <nav
        className={`top-level-nav text-center  flex-wrap uppercase text-xs  justify-center z-20   md:hidden ${
          special ? 'hidden' : 'flex mobile-nav'
        }`}
      >
        <div>
          {nav.map((item, idx) => {
            return (
              <div
                key={idx}
                className={`w-full text-center py-4 ${
                  openNavItem === idx ? 'open-nav-item' : ''
                }`}
              >
                <span
                  className={'top-nav-item font-semibold cursor-pointer'}
                  url={item.top_level_url}
                  onClick={() => {
                    if (openNavItem === idx) {
                      setOpenNavItem(null);
                    } else {
                      setOpenNavItem(idx);
                    }
                  }}
                >
                  {item.top_level_menu_item}
                </span>
                <div className={'subnav text-md'}>
                  <SubNav
                    setIsNavOpen={setIsNavOpen}
                    s={item.sub_menu_item}
                    classes={'block sub-nav-item pt-4'}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </nav>
    </>
  );
}
const SubNav = ({s, classes, setIsNavOpen}) => {
  return (
    <>
      {s.map((s, k) => {
        return (
          <span
            key={k}
            onClick={() => {
              setIsNavOpen(false);
            }}
          >
            <FreeLink
              classes={`${classes} ${k === 0 ? 'pt-8' : ''}`}
              url={s.free_sub_link}
            >
              {s.Label}
            </FreeLink>
          </span>
        );
      })}
    </>
  );
};
