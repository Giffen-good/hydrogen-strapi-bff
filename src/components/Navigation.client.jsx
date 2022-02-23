import FreeLink from './StrapiHelpers/FreeLink';
export default function Navigation({nav}) {
  return (
    <nav
      className={
        'top-level-nav text-left uppercase text-xs flex justify-between z-20'
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
            <SubNav subNav={item.sub_menu_item} />
          </div>
        );
      })}
    </nav>
  );
}
const SubNav = (s) => {
  return (
    <>
      {s.subNav.map((s, k) => {
        return (
          <FreeLink
            classes={'block sub-nav-item pt-10'}
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
