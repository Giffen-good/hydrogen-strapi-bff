import {Suspense} from 'react';

export default function Footer({backgroundColor, children, textColor}) {
  let styles = {
    backgroundColor: backgroundColor ? backgroundColor : 'inherit',
    color: textColor ? textColor : 'inherit'
  }
  return (
    <Suspense fallback={null}>
      <footer
        style={styles}
        className={`pb-12 pt-12 ${textColor && (textColor === '#FFF' || textColor === '#FFFFFF' ) ? 'invert-sm-icons' : '' }`}
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
