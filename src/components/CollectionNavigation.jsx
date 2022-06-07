import {Link} from '@shopify/hydrogen/client';

export default function CollectionNavigation({data, handle}) {
  return (
    <>
      <nav
        className={
          'sm:flex hidden collection-header  justify-between pb-4 pt-8 uppercase w-128 mx-auto'
        }
      >
        <Link
          className={`px-1 ${
            handle === 'all' ? 'border-b-2 border-yellow-bff' : ''
          }`}
          to={`/collections/all`}
        >
          All
        </Link>
        {data.map((navItem, idx) => {
          return (
            <Link
              className={` px-1 ${
                handle === navItem.handle ? 'border-b-2 border-yellow-bff' : ''
              }`}
              key={idx}
              to={`/collections/${navItem.handle}`}
            >
              {navItem.title}
            </Link>
          );
        })}
      </nav>
      <div className={'gutter sm:block hidden  no-mw'}>
        <div className={'border-t-2 pt-8'}></div>
      </div>
    </>
  );
}
