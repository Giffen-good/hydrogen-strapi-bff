import {Link} from '@shopify/hydrogen/client';
import NewsletterClient from './StrapiDynamicComponents/Newsletter.client';
import {useEffect, useState} from 'react';
import StrapiMediaClient from './StrapiMedia.client';
import Arrow from './icons/Arrow';

export default function Footer({menuLeft, menuRight, smMenu, time, bgColor}) {
  const [currentTime, setCurrentTime] = useState(time);
  useEffect(() => {
    console.log(new Date());
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(interval);
  }, [currentTime]);
  return (
    <div
      className={
        'no-mw pt-12 w-100 justify-center flex gutter text-xs uppercase font-semibold pb-6'
      }
    >
      <div className={'flex-1'}>
        {menuLeft.map((item, i) => {
          return (
            <MenuLink item={item} key={i}>
              {item.Label}
            </MenuLink>
          );
        })}
        <NewsletterClient landingSection={false} />
      </div>
      <div className="flex flex-1 flex-col text-center">
        <span className="block py-2">{currentTime}</span>
        <span className="block py-2"></span>
        <span className="flex-1"></span>
        <span className="block pt-2">Black Fashion Fair 2022</span>
      </div>
      <div className=" flex-1  text-right">
        <div className={'inline-block h-full'}>
          <div className={'flex h-full flex-col'}>
            <div className={'text-right'}>
              <div className={'text-left inline-block'}>
                {menuRight.map((item, i) => {
                  return (
                    <MenuLink item={item} key={i}>
                      <span className={'flex items-center'}>
                        {' '}
                        {item.Label}{' '}
                        {item.Label.toLowerCase() == 'support' ? (
                          <span className={'pl-2'}>
                            <Arrow />
                          </span>
                        ) : (
                          ''
                        )}
                      </span>
                    </MenuLink>
                  );
                })}
              </div>
            </div>
            <div className={'flex-1'}></div>
            <div className={'sm-menu flex text-right'}>
              {smMenu.map((item, i) => {
                return (
                  <a
                    className={'px-1'}
                    target="_blank"
                    rel="noopener noreferrer"
                    href={item.url}
                    key={i}
                  >
                    {item.icon && item.icon.data ? (
                      <StrapiMediaClient
                        classes={'sm-icon'}
                        media={item.icon.data.attributes}
                      />
                    ) : (
                      ''
                    )}
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
function MenuLink({item, children}) {
  if (item.url) {
    return (
      <Link className="block py-2" to={item.url}>
        {children}
      </Link>
    );
  } else {
    return <span className="block py-2">{children}</span>;
  }
}
function Time() {}
