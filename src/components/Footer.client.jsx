import {Link} from '@shopify/hydrogen/client';
import NewsletterClient from './StrapiDynamicComponents/Newsletter.client';
import {useEffect, useState} from 'react';
import Arrow from './icons/Arrow';

export default function Footer({menuLeft, menuRight, smMenu, time, bgColor, useSpecialFooter}) {
  const [currentTime, setCurrentTime] = useState(time);
  const dateObj = new Date();
  const month = dateObj.getUTCMonth(); //months from 1-12
  const day = dateObj.getUTCDate();
  const year = dateObj.getUTCFullYear();
  const months= ["January","February","March","April","May","June","July",
    "August","September","October","November","December"];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(interval);
  }, [currentTime]);
  return (
    <div>
      <div className={'mobile-nav gutter md:hidden text-xs uppercase font-semibold '}>
        <div className="pt-6 flex flex-1 flex-col text-center pb-6">
          <span className="block py-2">{currentTime}</span>
          <span className="block py-2">{day} {months[month]} {year}</span>
        </div>
        <div className={'py-3'}>
          <NewsletterClient landingSection={false} />
        </div>
        <div className={'py-6'}>
          <div className={'text-left inline-block'}>
            {menuLeft.map((item, i) => {
              return (
                <MenuLink item={item} key={i}>
                  {item.Label}
                </MenuLink>
              );
            })}
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
        <div className={'flex justify-between pt-3'}>
          <span className="block ">Black Fashion Fair © 2022</span>
          <div className={'sm-menu flex text-right'}>
            {smMenu.map((item, i) => {
             <SocialIcon key={i} {...item} />
            })}

          </div>
        </div>
      </div>
      <div
        className={
          'no-mw pt-12 w-100 justify-center md:flex gutter text-xs uppercase font-semibold pb-6 hidden '
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
          <span className="block py-2">{day} {months[month]} {year}</span>
          <span className="flex-1"></span>
          <span className="block pt-2">Black Fashion Fair © 2022</span>
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
                      <SocialIcon key={i} {...item} />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}
function SocialIcon(item) {
  const img = item.icon.data.attributes.url;
  const [svg, setSvg ] = useState(null)
  useEffect(() => {
    fetch(item.icon.data.attributes.url)
      .then(r => r.text())
      .then(text => {
        setSvg( text );
      })
      .catch(console.error.bind(console));
  },[])
  return (
    <a
      className={'px-1 flex items-center'}
      target="_blank"
      rel="noopener noreferrer"
      href={item.url}
    >
      {svg ? (
       <div className={'sm-icon'} dangerouslySetInnerHTML={{__html: svg}}></div>
      ) : (
        ''
      )}
    </a>
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
