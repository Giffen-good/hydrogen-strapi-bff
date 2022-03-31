import {Link} from '@shopify/hydrogen/client';
import {useState, useRef, useEffect} from 'react'
export default function CollectionMobileNavigation({data, handle}) {
    const [openDropdown, setOpenDropdown] = useState(false);
    function useOutsideAlerter(ref) {
      useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event) {
          if (ref.current && !ref.current.contains(event.target)) {
            setOpenDropdown(false)
          }
        }
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          // Unbind the event listener on clean up
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, [ref]);
    }
  const outsideRef = useRef();
  useOutsideAlerter(outsideRef)
  return (
    <>
      <nav
        className={
          'gutter sm:hidden inline-flex justify-between relative pb-10 uppercase w-full mx-auto'
        }
      >
          <div>FILTERS</div>
        <div className={'uppercase'}>
            <div className={'relative'} ref={outsideRef}>
                <button className={'uppercase cursor-pointer'}
                onClick={() => {setOpenDropdown((openDropdown) => !openDropdown)}}
                >View All</button>
                <div className={`${openDropdown ? 'flex' : 'hidden'} border border-black p-2 flex-wrap absolute top-10 z-20 text-right bg-white right-0 justify-end`}>
                    <span className={'px-1 py-2 flex-auto w-full'}><Link
                    className={`${
                        handle === 'all' ? 'border-b-2 border-yellow-bff' : ''
                    }`}
                    to={`/collections/all`}
                    onClick={() => setOpenDropdown(false)}
                    >
                    All
                    </Link></span>
                    {data.map((navItem, idx) => {
                    return (
                      <span
                      key={idx}
                      className={'px-1 py-2 flex-auto w-full'}><Link
                        className={` px-1 py-2 flex-auto w-full  ${
                            handle === navItem.handle ? 'border-b-2 border-yellow-bff' : ''
                        }`}
                        onClick={() => setOpenDropdown(false)}
                        to={`/collections/${navItem.handle}`}
                        >
                        {navItem.title}
                        </Link></span>
                    );
                    })}
                </div>
            </div>
        </div>
      </nav>
    </>
  );
}
