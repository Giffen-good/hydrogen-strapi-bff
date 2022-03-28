import FreeLink from './StrapiHelpers/FreeLink';
import {useState} from 'react';

export default function Navigation({nav, special}) {
  const [openNavItem, setOpenNavItem] = useState(null)
  return (
    <>
      <nav
        className={
          'top-level-nav text-left uppercase text-xs lg:flex justify-center z-20 pl-24 hidden '
        }
      >
        {nav.map((item, idx) => {
          return (
            <div key={idx} className={'nav-column flex-col '}>
              <FreeLink
                classes={'top-nav-item font-semibold'}
                url={item.top_level_url}
              >
                {item.top_level_menu_item}
              </FreeLink>
              <div className={'subnav'}>
                <SubNav s={item.sub_menu_item} classes={'block sub-nav-item pt-8'} />
              </div>
            </div>
          );
        })}
      </nav>
      <nav
        className={
          `top-level-nav text-cen†er  flex-wrap uppercase text-xs  justify-center z-20 text-2xl lg:hidden ${special ? 'hidden' : 'flex'}`
        }
      >
        <div>
          {nav.map((item, idx) => {
            return (
              <div key={idx} className={`w-full text-center py-4 ${openNavItem === idx ? 'open-nav-item' : ''}`}>
                <span
                  className={'top-nav-item font-semibold cursor-pointer'}
                  url={item.top_level_url}
                  onClick={() => {
                    console.log(openNavItem, idx)
                    if (openNavItem === idx) {
                      setOpenNavItem(null)
                    } else {
                      setOpenNavItem(idx)
                    }
                  }
                  }
                >
                  {item.top_level_menu_item}
                </span>
                <div className={'subnav text-lg'}>
                  <SubNav s={item.sub_menu_item} classes={'block sub-nav-item pt-4'} />
                </div>
              </div>
            );
          })}
        </div>
      </nav>
    </>
  );
}
const SubNav = ({s, classes}) => {
  return (
    <>
      {s.map((s, k) => {
        return (
          <FreeLink
            classes={classes}
            key={k}
            url={s.free_sub_link}
          >
            {s.Label}
          </FreeLink>
        );
      })}
    </>
  );
};
