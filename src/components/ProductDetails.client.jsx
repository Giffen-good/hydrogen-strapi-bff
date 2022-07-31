import {
  flattenConnection,
  useProduct,
  useParsedMetafields,
} from '@shopify/hydrogen/client';
import {
  ProductPrice,
  AddToCartButton,
  BuyNowButton,
  ProductProvider
} from '@shopify/hydrogen'
import ProductOptions from './ProductOptions.client';
import Gallery from './Gallery.client';
import {
  BUTTON_PRIMARY_CLASSES,
  BUTTON_SECONDARY_CLASSES,
} from './Button.client';
import {useState} from 'react';
import Minus from './icons/Minus';
import Plus from './icons/Plus';
import RichTextBody from './StrapiDynamicComponents/RichTextBody.client'
import {sanityCheckToAttributes} from './StrapiHelpers/util'
import MoneyCompareAtPrice from "./MoneyCompareAtPrice.client";
import MoneyPrice from "./MoneyPrice.client";
/**
 * A client component that displays detailed information about a product to allow buyers to make informed decisions
 */
function ProductPriceMarkup() {
  const product = useProduct();
  return (
    <div className="flex md:flex-col items-end font-semibold  md:items-start ">

      {product.selectedVariant.compareAtPriceV2 && (
        <MoneyCompareAtPrice money={product.selectedVariant.compareAtPriceV2} />
      )}
      <MoneyPrice money={product.selectedVariant.priceV2} />
    </div>
  );
}

function AddToCartMarkup() {
  const {selectedVariant} = useProduct();
  const isOutOfStock = !selectedVariant.availableForSale;

  return (
    <div className="space-y-2 mb-8 text-md">
      <AddToCartButton
        className={`${BUTTON_PRIMARY_CLASSES} py-3 rounded-lg`}
        disabled={isOutOfStock}
      >
        {isOutOfStock ? 'Out of stock' : 'Add to bag'}
      </AddToCartButton>
      {isOutOfStock ? (
        <p className="text-black text-center">Available in 2-3 weeks</p>
      ) : (
        <BuyNowButton
          className={`${BUTTON_SECONDARY_CLASSES} py-3 rounded-lg`}
        >
          Buy it now
        </BuyNowButton>
      )}
    </div>
  );
}


export default function ProductDetails({product, designer}) {

  const initialVariant = flattenConnection(product.variants)[0];
  const [activeTab, setActiveTab] = useState(null);
  const editorsNotesMetafield = product.metafields ? product.metafields.filter(m => m?.key === 'editor_s_notes')[0] : null;
  const designerData = designer?.page;
  const tabs = getTabs(editorsNotesMetafield);

  function getTabs(editorsNotesMetafield) {
    let tabs = [];
    if (product.description)
      tabs[0] = {
        label: 'DETAILS & CARE',
        component: <div className=" pb-8 pt-4 text-black text-md">{product.description}</div>,
      };
    if (editorsNotesMetafield?.value)
      tabs.push({
        label: "Editor's Notes",
        component: (
            <div className="pt-4">
              <RichTextBody noGutter={true} noPadding={true} >{editorsNotesMetafield.value}</RichTextBody>
            </div>
        )
      })
    return tabs;
  }
  return (
    <>
      <ProductProvider data={product} initialVariantId={initialVariant.id}>
        <div className="grid grid-cols-1 gap-x-0 pb-14 md:pb-20 md:grid-cols-[1fr,1fr] ">
          <div className="hidden mt-5 mb-8">
            <h1 className="text-4xl font-bold text-black mb-4">{product.title}</h1>
            {designerData && (
              <div className=" font-medium mb-2 text-gray-900">
                {designerData.title}
              </div>
            )}
            <span />
            <div className="flex justify-between md:block">
              <ProductPriceMarkup />
            </div>
          </div>

          <Gallery />

          <div className=" overflow-auto max-h-screen">
           <div className={' pl-6'}>
             <div className={'pt-12 md:pt-28 pr-7  md:max-w-lg'}>
               <div className=" md:block uppercase">
                 {designerData && (
                   <div className="text-2xl tracking-widest font-medium mb-2 text-gray-900">
                     {designerData.title}
                   </div>
                 )}
                 <div className={'flex justify-between items-center'}>
                   <h1 className=" font-semibold pt-3 text-black mb-4">{product.title}</h1>

                   <ProductPriceMarkup />
                 </div>
               </div>
               {/* Product Options */}
               <div className="mt-10 mb-2">
                 <ProductOptions />
                 <AddToCartMarkup />
                 <div className="flex items space-x-4">

                 </div>
               </div>
               <Designer designerData={designerData} />
               {/* Product Description */}
               <div className={'accordion md:pt-6'}>
                 <div className={'tab'}>
                   {tabs.map((item, i) => {
                     return (
                       <div
                         className={`tabs pb-4 ${
                           activeTab == i ? 'open-tab' : 'closed-tab'
                         }`}
                         key={i}
                       >
                         <div
                           role="button"
                           onClick={() => {
                             if (activeTab === i) {
                               setActiveTab(null);
                             } else {
                               setActiveTab(i);
                             }
                           }}
                           className={
                             'flex cursor-pointer justify-between tab-label border-none'
                           }
                         >
                           <h3 className={' uppercase'}>{item.label}</h3>
                           <span>{activeTab === i ? <Minus /> : <Plus />}</span>
                         </div>

                         <div className={'tab-content '}>{item.component}</div>
                       </div>
                     );
                   })}
                 </div>
               </div>
               <Designer designerData={designerData} desktop={true}  />
             </div>
           </div>

          </div>
        </div>
      </ProductProvider>
    </>
  );
}
function Designer({designerData, desktop}) {
  if (!designerData) return
  const [readMore, setReadMore] = useState(false);
  return (
    <section className={`pb-16 pt-0 ${desktop ? 'hidden md:block ' : 'md:hidden'}`}>
      <h3 className={'text-2xl tracking-widest font-medium mb-2 text-gray-900 mt-8 uppercase'}>Discover {designerData.title}</h3>
      <div className={`... ${!readMore ? 'line-clamp-3' : ''}`}>
        <RichTextBody noGutter={true} noPadding={true}>
          {designerData.body}
        </RichTextBody>
      </div>
      <div className={'pt-4 uppercase cursor-pointer flex items-center '} onClick={() => setReadMore((readMore) => !readMore)}>
        {readMore ?
          (
            <><span className={'flex items-center '}><Minus /></span><span>Read Less</span></>
          ) :  (
            <><span className={'flex items-center'}><Plus /></span><span>Read More</span></>
          )
        }
      </div>
    </section>
  )
}




function SizeChart() {
  return (
    <>
      <h3
        className="text-xl text-black font-semibold mt-8 mb-4"
        id="size-chart"
      >
        Size Chart
      </h3>
      <table className="min-w-full table-fixed  text-center bg-white">
        <thead>
        <tr className="bg-black text-white">
          <th className="w-1/4 py-2 px-4 font-normal">Board Size</th>
          <th className="w-1/4 py-2 px-4 font-normal">154</th>
          <th className="w-1/4 py-2 px-4 font-normal">158</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td className="p-3 border border-black">Weight Range</td>
          <td className="p-3 border border-black">120-180 lbs. /54-82kg</td>
          <td className="p-3 border border-black">150-200 lbs. /68-91 kg</td>
        </tr>
        <tr>
          <td className="p-3 border border-black">Waist Width</td>
          <td className="p-3 border border-black">246mm</td>
          <td className="p-3 border border-black">255mm</td>
        </tr>
        <tr>
          <td className="p-3 border border-black">Stance Width</td>
          <td className="p-3 border border-black">-40</td>
          <td className="p-3 border border-black">-40</td>
        </tr>
        <tr>
          <td className="p-3 border border-black">Binding Sizes</td>
          <td className="p-3 border border-black">
            Men&rsquo;s S/M, Women&rsquo;s S/M
          </td>
          <td className="p-3 border border-black">
            Men&rsquo;s L, Women&rsquo;s L
          </td>
        </tr>
        </tbody>
      </table>
    </>
  );
}