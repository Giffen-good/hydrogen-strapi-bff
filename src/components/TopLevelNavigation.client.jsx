import FreeLink from './StrapiHelpers/FreeLink';
export default function TopLevelNavigation({nav}) {
  return (
    <nav className={'top-level-nav uppercase text-xs grid grid-cols-6'}>
      {nav.map((item, idx) => {
        return (
          <FreeLink key={idx} url={item.top_level_url}>
            {item.top_level_menu_item}
          </FreeLink>
        );
      })}
    </nav>
  );
}
