import {EventEmitter} from 'eventemitter3';

export const has = (object, key) => {
  return object ? hasOwnProperty.call(object, key) : false;
};
export const sanityCheckToAttributes = (d) => {
  return (
    (d.data && d.data?.attributes !== null) ||
    (d.data[0] && d.data[0]?.attributes !== null)
  );
};

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
};

export const getGlobalPageSettings = (settings) => {
  let backgroundColor = null;
  let flush = false;
  let useNavigation = true;
  let useSpecialLayout = false;
  if (settings?.background_color) backgroundColor = settings.background_color;
  if (settings?.background_transparency) flush = true;
  if (settings?.use_special_layout) useSpecialLayout = true;
  return {backgroundColor, flush, useSpecialLayout, useNavigation};
};

export const HEADER_PARAMS = {
  backgroundTransparency: true,
  useNavigation: true,
  useSpecialLayout: false,
};
