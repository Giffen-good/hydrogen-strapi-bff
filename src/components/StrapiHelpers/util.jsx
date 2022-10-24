import {EventEmitter} from 'eventemitter3';
import {Cloudinary} from '@cloudinary/url-gen';

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
  },
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
  LETTER_CLOSED: 'LETTER_CLOSED',
};

export const copyrightText = () => {
  const d = new Date();
  return `ALL IMAGES © BLACK FASHION FAIR ${d.getFullYear()}`;
};

export const getGlobalPageSettings = (settings) => {
  let backgroundColor = null;
  let flush = false;
  let useNavigation = true;
  let useSpecialLayout = false;
  let useSpecialFooter = false;
  let useFullLogo = false;
  let footerTextColor = null;
  let footerBackgroundColor = null;
  let metaTitle = null;
  let metaDescription =
    'Black Fashion Fair is a conceptual retail, educational, and cultural experience aimed toward the discovery and furtherance of Black designers.';
  if (settings?.meta_description) metaDescription = settings.meta_description;
  if (settings?.meta_title) metaTitle = settings.meta_title;
  if (settings?.background_color) backgroundColor = settings.background_color;
  if (settings?.footer_text_color) footerTextColor = settings.footer_text_color;
  if (
    settings?.background_transparency &&
    settings.background_transparency === 'transparent'
  )
    flush = true;
  if (settings?.use_special_layout) useSpecialLayout = true;
  if (settings?.use_special_footer) useSpecialFooter = true;
  if (settings?.use_full_logo) useFullLogo = true;
  if (settings?.footer_background_color)
    footerBackgroundColor = settings.footer_background_color;
  if (
    typeof settings?.use_navigations !== 'undefined' &&
    !settings.use_navigations
  )
    useNavigation = false;

  return {
    metaTitle,
    metaDescription,
    backgroundColor,
    flush,
    useSpecialLayout,
    useNavigation,
    useSpecialFooter,
    useFullLogo,
    footerTextColor,
    footerBackgroundColor,
  };
};

export const HEADER_PARAMS = {
  backgroundTransparency: true,
  useNavigation: true,
  useSpecialLayout: false,
  useSpecialFooter: false,
};

export const getFont = (font_family) => {
  switch (font_family) {
    case 'font_serif':
      return 'font-serif';
    case 'font_semibold':
      return 'font-semibold';
    case 'font_sans':
      return 'font-sans';
  }
};
export const getTextAlignment = (text_alignment) => {
  switch (text_alignment) {
    case 'left_aligned':
      return 'text-left';
    case 'centered':
      return 'text-center';
    case 'right_aligned':
      return 'text-right';
    case 'justified':
      return 'text-justify';
  }
};
