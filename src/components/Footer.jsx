import {Suspense} from 'react';

export default function Footer({params, children}) {
  let useNav = true;
  if (
    params &&
    has(params, 'attributes') &&
    has(params.attributes, 'header_type')
  ) {
    useNav = params.attributes.header_type.use_navigation;
  }
  let bgColor = null;
  if (
    params &&
    has(params, 'attributes') &&
    params.attributes?.background_color
  ) {
    bgColor = params.attributes.background_color;
  }
  return (
    <Suspense fallback={null}>
      <footer
        style={
          bgColor ? {backgroundColor: bgColor} : {backgroundColor: 'inherit'}
        }
        role="contentinfo"
      >
        {children}
      </footer>
    </Suspense>
  );
}
function has(object, key) {
  return object ? hasOwnProperty.call(object, key) : false;
}
