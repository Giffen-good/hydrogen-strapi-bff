import StrapiMedia from './StrapiMedia';
import {sanityCheckToAttributes} from './StrapiHelpers/util';
import RichTextBody from './StrapiDynamicComponents/RichTextBody';
import FreeLink from './StrapiHelpers/FreeLink';
import {getAttributes} from './StrapiHelpers/componentImports';
import JustifiedText from './StrapiPartials/JustifiedText'
export default function CollectionBanner({data}) {
    if (!data?.data.length) return
    const attributes = data.data[0].attributes;
    const image = sanityCheckToAttributes(attributes.image) ? getAttributes(attributes.image) : null;
    return (
        <section className=' relative pt-14 narrow-gutter pb-12'>
            <div className={'flex relative flex-wrap lg:flex-nowrap'}>

                <div className={'lg:flex-1 flex-auto relative lg:w-auto w-full'}>
                    <h2 className={'absolute brand-label text-xs uppercase'}>{attributes.brand_name}</h2>

                    <h3 className={'absolute company-label text-xs uppercase'}>Black Fashion Fair</h3>

                    {image ? 
                    <StrapiMedia media={image} classes={'object-cover'} /> : 
                    ''}
                </div>
                <div className={'flex-1  lg:w-auto w-full flex'}>
                    <div className={'lg:px-12 px-0 flex flex-col'}>
                        <div className={'text-box text-center md:pt-10 lg:pt-14 xl:pt-20 flex-1 pt-6 pb-4'}>
                            <h1 className={'lg:text-6xl xl:text-7xl text-6xl uppercase'}>{attributes.Heading}</h1>
                            <div className={'sm:px-8 text-lg pt-2'}>
                                <RichTextBody noGutter={true} noPadding={true}>
                                    {attributes.body}
                                </RichTextBody>
                            </div>
                        </div>
                        <div className={'callout flex xs:justify-between  xs:flex-nowrap flex-wrap justify-center pb-4 pt-4 xs:pb-8 xs:pt-6 lg:pt-0'}>
                            <div className={'xs:pt-0 pt-6 order-2 xs:order-1 xs:w-auto w-full text-center'}>
                                <button className={'btn'}>
                                    <FreeLink url={attributes.link.free_sub_link}>
                                        {attributes.link.Label}
                                    </FreeLink>
                                </button>
                            </div>
                            <JustifiedText>
                                {attributes.credits}
                            </JustifiedText>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    )
}