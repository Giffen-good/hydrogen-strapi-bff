import Logo from './Logo';
import FreeLink from './StrapiHelpers/FreeLink';
import StrapiMediaClient from './StrapiMedia.client'
export default function SpecialFooter({specialFooterNav, smMenu}) {
    console.log(specialFooterNav)
    return (
        <div className={' text-white uppercase special-footer'}>
            <div className={'mx-auto text-center'}>
                <Logo />
            </div>
            <div className={'footer text-lg pt-10 pb-28 flex justify-center font-semibold '}>
                {specialFooterNav.map((item, k) => {
                    return <FreeLink classes={'px-8'} key={k} url={item.free_sub_link}>{item.Label}</FreeLink>
                })}
            </div>
            <div className={'flex justify-between text-sm w-full gutter no'}>
                <div className={'flex-1'}>
                 <FreeLink url={'/collections/all'}>Fair</FreeLink>
                </div>
                <div className={'flex-1 text-center'}>
                    <span className={''}>Black Fashion Fair © 2022</span>
                </div>
                <div className={'sm-menu flex text-right flex-1'}>
                  {smMenu.map((item, i) => {
                    return (
                      <a
                        className={'px-2'}
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
    )
}


