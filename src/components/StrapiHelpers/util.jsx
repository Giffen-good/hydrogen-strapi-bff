import {EventEmitter} from 'eventemitter3';
import {Cloudinary} from "@cloudinary/url-gen";
import SeoShopify from '../Seo.client';

export const has = (object, key) => {
  return object ? hasOwnProperty.call(object, key) : false;
};
export const sanityCheckToAttributes = (d) => {
  return (
    (d.data && d.data?.attributes !== null) ||
    (d.data[0] && d.data[0]?.attributes !== null)
  );
};
export const cld = new Cloudinary({
  cloud: {
    cloudName: import.meta.env.VITE_CLOUDINARY_NAME,
    apiKey: import.meta.env.VITE_CLOUDINARY_KEY,
    apiSecret: import.meta.env.VITE_CLOUDINARY_SECRET,
  }
}); 
const eventEmitter = new EventEmitter();
export const Emitter = {
  on: (event, fn) => eventEmitter.on(event, fn),
  once: (event, fn) => eventEmitter.once(event, fn),
  off: (event, fn) => eventEmitter.off(event, fn),
  emit: (event, payload) => eventEmitter.emit(event, payload),
};
Object.freeze(Emitter);
export const EventConstants = {
  SET_LETTER: 'SET_LETTER',
  CHANGE_LETTER: 'CHANGE_LETTER',
  OPEN_SOMEWHERE: 'OPEN_SOMEWHERE',
  OPEN_TAB: 'OPEN_TAB',
  CHANGE_ACTIVE_TAB: 'CHANGE_ACTIVE_TAB',
  CLOSE_LETTER: 'CLOSE_LETTER',
  LETTER_CLOSED: 'LETTER_CLOSED'
};

export const getGlobalPageSettings = (settings) => {
  let backgroundColor = null;
  let flush = false;
  let useNavigation = true;
  let useSpecialLayout = false;
  let useSpecialFooter = false;
  let useFullLogo = false
  
  if (settings?.background_color) backgroundColor = settings.background_color;
  if (settings.background_transparency === 'transparent') flush = true;
  if (settings?.use_special_layout) useSpecialLayout = true;
  if (settings?.use_special_footer) useSpecialFooter = true
  if (settings?.use_full_logo) useFullLogo = true
  if (!settings.use_navigations) useNavigation = false

  return {backgroundColor, flush, useSpecialLayout, useNavigation, useSpecialFooter, useFullLogo};
};

export const Seo = ({d}) => {
  const page = {
    seo: {
      title: 'BBF',
      description: 'this is a test'
    }
  }
  // return <div></div>
  console.log(page)
  return <SeoShopify type="page" data={page} />
}
export const HEADER_PARAMS = {
  backgroundTransparency: true,
  useNavigation: true,
  useSpecialLayout: false,
  useSpecialFooter: false
};
