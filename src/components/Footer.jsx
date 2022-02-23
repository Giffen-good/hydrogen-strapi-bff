import {Suspense} from 'react';

export default function Footer({backgroundColor, children}) {
  return (
    <Suspense fallback={null}>
      <footer
        style={
          backgroundColor
            ? {backgroundColor: backgroundColor}
            : {backgroundColor: 'inherit'}
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